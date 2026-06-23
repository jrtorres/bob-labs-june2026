"""
loan_calculator.py

Calculates monthly loan payments and generates an amortization schedule
for a fixed-rate loan.
"""


def calculate_monthly_payment(principal: float, annual_rate: float, term_months: int) -> float:
    """
    Calculate the fixed monthly payment for a loan using the standard
    amortization formula.

    Args:
        principal:     Total loan amount in dollars.
        annual_rate:   Annual interest rate as a decimal (e.g. 0.05 for 5%).
        term_months:   Loan duration in months.

    Returns:
        Monthly payment amount, rounded to two decimal places.
    """
    if annual_rate == 0:
        return round(principal / term_months, 2)

    monthly_rate = annual_rate / 12
    payment = principal * (monthly_rate * (1 + monthly_rate) ** term_months) / \
              ((1 + monthly_rate) ** term_months - 1)
    return round(payment, 2)


def amortization_schedule(principal: float, annual_rate: float, term_months: int) -> list[dict]:
    """
    Generate a month-by-month amortization schedule.

    Each entry in the returned list contains:
        month          - payment number (1-based)
        payment        - total payment made
        principal_paid - portion applied to principal
        interest_paid  - portion applied to interest
        balance        - remaining principal after this payment

    Args:
        principal:    Total loan amount in dollars.
        annual_rate:  Annual interest rate as a decimal.
        term_months:  Loan duration in months.

    Returns:
        List of dicts, one per month.
    """
    monthly_payment = calculate_monthly_payment(principal, annual_rate, term_months)
    monthly_rate = annual_rate / 12
    balance = principal
    schedule = []

    for month in range(1, term_months + 1):
        interest_paid = round(balance * monthly_rate, 2)
        principal_paid = round(monthly_payment - interest_paid, 2)
        balance = round(balance - principal_paid, 2)

        schedule.append({
            "month": month,
            "payment": monthly_payment,
            "principal_paid": principal_paid,
            "interest_paid": interest_paid,
            "balance": max(balance, 0.0),
        })

    return schedule


def total_interest_paid(principal: float, annual_rate: float, term_months: int) -> float:
    """Return the total interest paid over the life of the loan."""
    monthly_payment = calculate_monthly_payment(principal, annual_rate, term_months)
    return round(monthly_payment * term_months - principal, 2)


if __name__ == "__main__":
    # Example: $250,000 mortgage at 6.5% over 30 years
    loan_amount = 250_000
    rate = 0.065
    months = 360

    payment = calculate_monthly_payment(loan_amount, rate, months)
    total_interest = total_interest_paid(loan_amount, rate, months)
    schedule = amortization_schedule(loan_amount, rate, months)

    print(f"Loan amount:      ${loan_amount:,.2f}")
    print(f"Annual rate:      {rate * 100:.2f}%")
    print(f"Term:             {months // 12} years ({months} months)")
    print(f"Monthly payment:  ${payment:,.2f}")
    print(f"Total interest:   ${total_interest:,.2f}")
    print()
    print(f"{'Month':<8} {'Payment':>10} {'Principal':>12} {'Interest':>10} {'Balance':>14}")
    print("-" * 58)
    for row in schedule[:6]:
        print(
            f"{row['month']:<8} "
            f"${row['payment']:>9,.2f} "
            f"${row['principal_paid']:>11,.2f} "
            f"${row['interest_paid']:>9,.2f} "
            f"${row['balance']:>13,.2f}"
        )
    print("  ...")
