from sympy import symbols, integrate

# Define the variable
x = symbols('x')

# Define the function to be integrated
f = (1 - x + 2*x**2 - x**3) / (x*(x**2 + 1)**2)

# Perform the integration
integral = integrate(f, x)
integral
