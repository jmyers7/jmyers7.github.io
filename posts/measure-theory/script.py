import numpy as np
import matplotlib.pyplot as plt
from matplotlib.colors import LinearSegmentedColormap
import StochasticProcesses
import importlib

importlib.reload(StochasticProcesses)

np.random.seed(42)
plt.style.use("../../aux-files/custom-theme.mplstyle")
yellow = "#FFC300"
blue = "#3399FF"
pink = "#FF3399"
grey = "#121212"
white = "#E5E5E5"
purple = "#AA77CC"
colors = [yellow, blue, pink]

chain_length = 3
num_chains = 10
alpha = 0.8
beta = 0.3
theta = 0.5
num_chains = 10
color_stops = [blue, pink, yellow]
custom_cmap = LinearSegmentedColormap.from_list("custom_cmap", color_stops)
colors = [custom_cmap(i / (num_chains - 1)) for i in range(num_chains)]

mc = StochasticProcesses.TwoStateMarkovChain(alpha, beta, theta, chain_length=40)
mc.plot_simulations(num_chains, colors=colors, figsize=(10, 6))

theta = 0.3
a = 10
chain_length = 200
num_chains = 10
bet = StochasticProcesses.ThreeWinStreakSelectionStrategy(theta, chain_length, a=a)
bet.plot_simulations(num_chains, colors=colors, figsize=(10, 6))
