# Workshop Prerequisites

## System Requirements

### Operating Systems
- **Windows**: Windows 10 or later
- **macOS**: macOS 10.15 (Catalina) or later
- **Linux**: Ubuntu 20.04+, Fedora 33+, or equivalent

### Hardware
- **RAM**: 4GB minimum, 8GB recommended
- **Disk Space**: 2GB free space
- **Internet**: Stable internet connection required

## Software

### General
- A terminal
- A modern web browser

### Python 3.8 or Higher

#### Installation

**Windows:**
1. Download from [python.org](https://www.python.org/downloads/)
2. Run installer
3. ✅ Check "Add Python to PATH"
4. Click "Install Now"

**macOS:**
```bash
# Using Homebrew (recommended)
brew install python@3.11

# Or download from python.org
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install python3 python3-pip python3-venv

# Fedora
sudo dnf install python3 python3-pip

# Arch
sudo pacman -S python python-pip
```

#### Install pip (if not included)
```bash
# Windows/macOS
python -m ensurepip --upgrade

# Linux
sudo apt install python3-pip  # Ubuntu/Debian
```

### Node.js 14 or Higher

#### Installation

**Windows/macOS:**
1. Download from [nodejs.org](https://nodejs.org/)
2. Choose LTS version (recommended)
3. Run installer with default settings

**Linux:**
```bash
# Using NodeSource repository (recommended)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

# Or using nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts
```

### Git 2.x or Higher

#### Installation

**Windows:**
1. Download from [git-scm.com](https://git-scm.com/)
2. Run installer
3. Use recommended settings
4. Choose your preferred editor

**macOS:**
```bash
# Using Homebrew
brew install git

# Or install Xcode Command Line Tools
xcode-select --install
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt install git

# Fedora
sudo dnf install git

# Arch
sudo pacman -S git
```

#### Git Configuration
```bash
# Set your name and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Verify configuration
git config --list
```

### Bob

#### Installation

Follow the official Bob installation guide for your platform:
- [Bob Installation Documentation](https://pages.github.ibm.com/code-assistant/bob-docs/) (internal)
- [Bob Installation Documentation](https://ibm.biz/bob-doc) 


- Node 
- [BobShell](https://bob.ibm.com/docs/shell/getting-started/install-and-setup) (the `bob` CLI)
  - https://bob.ibm.com/docs/shell/getting-started/install-and-setup#using-the-command-palette
- [`uv`](https://docs.astral.sh/uv/getting-started/installation/) — single install, provides both `uv` and `uvx`

## Verification

```bash
git --version
bob --version
python --version
uv --version
node --version
java --version    # afternoon (both teams)
mvn --version     # afternoon (both teams)
```

## Next Steps

Once you've completed all setup steps:

1. ✅ Verify all software is installed
2. ✅ Configure Git with your information
3. ✅ Test Bob connection
5. ✅ Create a test project to verify everything works

---

*Last Updated: December 2025*  
*Version: 1.0*