# file: data_pipeline.py
"""
Vulnerable data pipeline example (Data Engineering)
Contains multiple intentional security issues for testing scanners.
"""
import os
import re
import csv
import sqlite3
import subprocess
import pickle
import tempfile
import requests
import logging
from datetime import datetime

# Hardcoded credentials (VULN: hardcoded credentials)
DB_PATH = '/tmp/app_data.db'
DB_USER = 'admin'
DB_PASSWORD = 'P@ssw0rd123'  # << hardcoded secret

logging.basicConfig(level=logging.INFO)


def init_db():
    # Database initialization using sqlite for simplicity
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            profile BLOB
        )
    ''')
    conn.commit()
    conn.close()


# Allowlist pattern for table names: must start with a letter or underscore,
# contain only alphanumerics and underscores, and be at most 64 characters.
# SQL identifiers cannot be parameterized with `?` placeholders, so we validate
# the name against this strict allowlist before interpolating it into the query.
_SAFE_TABLE_NAME_RE = re.compile(r'^[A-Za-z_][A-Za-z0-9_]{0,63}$')


def ingest_csv(file_path, table_name, source_label):
    """
    Ingest CSV into sqlite table.

    Security fixes applied (VULN-004):
     - table_name is validated against a strict allowlist regex before use as a
       SQL identifier. SQLite does not support parameterized identifiers, so
       allowlist validation is the correct mitigation here.
     - Row values and source_label are inserted via parameterized queries
       (sqlite3 `?` placeholders), which completely prevents SQL injection in
       the VALUES clause regardless of the data content.
    """
    # SECURITY: Validate table_name before interpolating it as a SQL identifier.
    # This prevents an attacker from injecting SQL through the table name
    # (e.g., "x; DROP TABLE users; --").
    if not _SAFE_TABLE_NAME_RE.match(table_name):
        raise ValueError(
            f"Invalid table name {table_name!r}: must match {_SAFE_TABLE_NAME_RE.pattern}"
        )

    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    # table_name is safe to interpolate here: it has been validated against the
    # allowlist above and cannot contain SQL metacharacters.
    create_sql = (
        f"CREATE TABLE IF NOT EXISTS {table_name} "
        "(a TEXT, b TEXT, c TEXT, source TEXT)"
    )
    cur.execute(create_sql)

    with open(file_path, newline='') as csvfile:
        reader = csv.reader(csvfile)
        # SECURITY: Use parameterized queries (`?` placeholders) for all row
        # values. sqlite3 passes these values out-of-band from the SQL string,
        # so no amount of SQL metacharacters in the data can alter the query
        # structure. This replaces the previous f-string interpolation which
        # allowed arbitrary SQL injection through CSV cell contents.
        rows = [(row[0], row[1], row[2], source_label) for row in reader]
        cur.executemany(
            f"INSERT INTO {table_name} (a,b,c,source) VALUES (?,?,?,?)",
            rows,
        )

    conn.commit()
    conn.close()


def compress_and_upload(path, remote_host):
    """
    Compress a directory and 'upload' it using scp.
    VULNS:
     - Uses shell=True with concatenated user data -> command injection
    """
    archive = f"/tmp/archive_{os.path.basename(path)}.tar.gz"
    # Dangerous: using shell and concatenation
    cmd = f"tar -czf {archive} -C {os.path.dirname(path)} {os.path.basename(path)}"
    subprocess.run(cmd, shell=True, check=True)

    # Simulated upload (we won't actually SCP) but the command demonstrates risk
    scp_cmd = f"scp {archive} {remote_host}:/tmp/"
    subprocess.run(scp_cmd, shell=True, check=False)


def load_user_profile(blob_data):
    """
    Deserialize user profile blob from database (VULN: insecure deserialization)
    """
    # directly unpickle data from the database -> remote code execution risk
    profile = pickle.loads(blob_data)
    return profile


def fetch_model(url):
    """
    Fetch a model file from an external URL. Intentionally disables SSL verification.
    VULN: insecure transport (verify=False)
    """
    resp = requests.get(url, verify=False)
    return resp.content


def write_sensitive_file(path, data):
    # Create a file with insecure permissions
    with open(path, 'w') as f:
        f.write(data)
    os.chmod(path, 0o777)  # VULN: overly permissive permissions


def main():
    init_db()

    # Example of reading an uploaded CSV from an untrusted path
    user_supplied_csv = '/tmp/user_upload.csv'  # imagine this came from the web
    ingest_csv(user_supplied_csv, 'ingested_data', 'user_upload')

    # Example of insecure file creation
    write_sensitive_file('/tmp/api_key.txt', 'APIKEY-EXAMPLE-SECRET')

    # Example: compressing a directory coming from user input
    user_dir = '/var/data/uploads'  # imagine this is user-controlled
    compress_and_upload(user_dir, 'attacker.example.com')

    # Example: loading a pickled object read from disk (untrusted)
    try:
        with open('/tmp/profile_blob.bin', 'rb') as bf:
            blob = bf.read()
            profile = load_user_profile(blob)
            logging.info('Loaded profile: %s', profile)
    except FileNotFoundError:
        logging.info('No profile blob found; skipping')

    # Fetch model payload insecurely
    model_bytes = fetch_model('https://example.com/model.bin')
    if model_bytes:
        with open('/tmp/model.bin', 'wb') as mb:
            mb.write(model_bytes)


if __name__ == '__main__':
    main()

