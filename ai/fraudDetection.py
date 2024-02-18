import torch
import torch.nn as nn
import numpy as np
import matplotlib.pyplot as plt

# Data
timestamps = np.arange(0, 15).reshape(-1, 1)
temperature = np.array([22.0, 22.0, 22.0, 22.0, 22.0, 22.0, 22.0, 22.0, 21.0, 30.0, 21.0, 21.0, 21.0, 21.0, 21.0]).reshape(-1, 1)

# Model
model = nn.Linear(1, 1)

# Loss function and optimizer
criterion = nn.MSELoss()
optimizer = torch.optim.SGD(model.parameters(), lr=0.01)

# Training
for epoch in range(1000):
    optimizer.zero_grad()
    outputs = model(torch.tensor(timestamps, dtype=torch.float32))
    loss = criterion(outputs, torch.tensor(temperature, dtype=torch.float32))
    loss.backward()
    optimizer.step()

# Plotting
plt.scatter(timestamps, temperature, color='blue', label='Actual')
plt.plot(timestamps, model(torch.tensor(timestamps, dtype=torch.float32)).detach().numpy(), color='red', label='Predicted')
plt.xlabel('Time')
plt.ylabel('Temperature')
plt.legend()
plt.show()
