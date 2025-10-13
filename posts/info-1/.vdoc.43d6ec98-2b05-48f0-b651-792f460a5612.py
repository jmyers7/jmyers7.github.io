# type: ignore
# flake8: noqa
# | echo: true
# | code-fold: true

# Import probability distributions, integration, and plotting libraries
from scipy.stats import norm, multivariate_normal, beta, poisson, binom, entropy
from scipy.integrate import quad
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.colors import LinearSegmentedColormap
from matplotlib.ticker import PercentFormatter
import matplotlib.gridspec as gridspec

# Set random seed for reproducibility
np.random.seed(42)

# Set custom matplotlib style (user must use their own style file)
plt.style.use("../../aux-files/custom-theme.mplstyle")

# Define color palette for plots
yellow = "#FFC300"
blue = "#3399FF"
pink = "#FF3399"
purple = "#AA77CC"
grey = "#121212"
white = "#E5E5E5"

# Create a custom colormap for conditional distributions
conditional_stops = [blue, purple, yellow]
conditional_cmap = LinearSegmentedColormap.from_list(
    "conditional_cmap", conditional_stops
)


# Define a class for random variables (discrete or continuous)
class RV:
    """
    A class representing a random variable (discrete or continuous), with optional support for conditional densities.

    Parameters
    ----------
    support : array-like or None
        The support of the random variable (e.g., possible values for discrete, grid for continuous).
    density : callable
        The marginal density or mass function. Should accept a value (or array of values) and return the density/mass.
    conditional_density : callable, optional
        The conditional density function f(y|x). Should accept (y, x) and return the density of y given x.

    Attributes
    ----------
    support : array-like or None
        The support of the random variable.
    density : callable
        The marginal density or mass function.
    conditional_density : callable or None
        The conditional density function, if provided.
    density_array : np.ndarray or None
        The marginal density evaluated on the support, if support is array-like.
    """

    def __init__(
        self,
        support=None,
        density=None,
        conditional_density=None,
        conditional_support=None,
    ):
        self.support = support
        self.density = density
        self.conditional_density = conditional_density
        self.conditional_support = conditional_support

        # Precompute density array if support is array-like and density is provided
        if support is not None and density is not None:
            self.density_array = np.array([density(x) for x in support])
        else:
            self.density_array = None

        # Precompute conditional density array if support is array-like and conditional density is provided
        if (
            support is not None
            and density is not None
            and conditional_density is not None
            and conditional_support is not None
        ):
            
        for y in conditional_support:
            self.cond_density_array = [conditional_density(support, y) for y in conditional_support]
        else:
            self.cond_density_array = None

    def pdf(self, x):
        """
        Evaluate the marginal density or mass function at x.
        """
        return self.density(x)

    def pmf(self, x):
        """
        Alias for pdf, for discrete random variables.
        """
        return self.pdf(x)

    def set_conditional_density(self, cond_density):
        """
        Set the conditional density function f(y|x).
        """
        self.conditional_density = cond_density

    def cond_pdf(self, y, x):
        """
        Evaluate the conditional density f(y|x).
        """
        if self.conditional_density is None:
            raise ValueError("Conditional density function not set.")
        return self.conditional_density(y, x)

    def __repr__(self):
        return (
            f"RV(support={self.support}, "
            f"density={self.density}, "
            f"conditional_density={self.conditional_density})"
        )



