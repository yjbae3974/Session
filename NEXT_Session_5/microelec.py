import numpy as np
import matplotlib.pyplot as plt

# Define the input voltage range
V_in = np.linspace(-1, 5, 400)  # Range from -1V to 5V for illustration

# Parameters
V_B = 2  # Bias voltage
V_D_on = 0.8  # Diode forward voltage

# Initialize V_out for the ideal and constant voltage models
V_out_ideal = np.zeros_like(V_in)
V_out_constant = np.zeros_like(V_in)

# Calculate V_out for ideal diode model for Circuit (a)
V_out_ideal[V_in > V_B] = V_in[V_in > V_B]
V_out_ideal[V_in <= V_B] = V_B

# Calculate V_out for constant voltage model for Circuit (a)
V_out_constant[V_in > V_B + V_D_on] = V_in[V_in > V_B + V_D_on]
V_out_constant[V_in <= V_B + V_D_on] = V_B

# Plotting
plt.figure(figsize=(10, 8))

# Plot for the ideal diode model
plt.subplot(2, 1, 1)
plt.plot(V_in, V_out_ideal, label='Ideal Diode Model')
plt.xlabel('Input Voltage V_in (V)')
plt.ylabel('Output Voltage V_out (V)')
plt.title('Input/Output Characteristics for Circuit (a) - Ideal Diode Model')
plt.grid(True)
plt.legend()

# Plot for the constant voltage model
plt.subplot(2, 1, 2)
plt.plot(V_in, V_out_constant, label='Constant Voltage Model')
plt.xlabel('Input Voltage V_in (V)')
plt.ylabel('Output Voltage V_out (V)')
plt.title('Input/Output Characteristics for Circuit (a) - Constant Voltage Model')
plt.grid(True)
plt.legend()

plt.tight_layout()
plt.show()