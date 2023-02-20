---
layout: post-white
title: a primer on embedded manifolds
category: a geometric and topological toolkit
---

<div class="post-title-white">
<h1 class="accent-color">a primer on embedded manifolds</h1>
</div>

The possibility of applying geometric techniques to machine learning is what originally sparked my interest in the latter subject. Using such methods, the goal is to inject spatial intuition into mathematical machine learning, which is often presented---at least in many introductory textbooks---as an almost purely analytical subject, with a heavy reliance on probability theory. A prime and very simple example of geometric intuition applied to machine learning is the familiar description of the gradient descent algorithm as *walking downhill to find the minimum*. In this description, you are being asked to *visualize* the graph of the objective function, and therefore to conceive of the function as a geometric object, and not purely an analytic one. The geometry lends insight and *explains* why the algorithm works.

The possibilities of using geometry in machine learning go well beyond the basic gradient descent algorithm, however, and finding new and interesting geometric applications in machine learning is an active and exciting area of contemporary research. For example, there are several papers appearing in recent proceedings of the <a href="https://icml.cc/">ICML</a> (from the "Topology, Algebra, and Geometry in Machine Learning" workshop) that I want to explore in future posts in this blog. In addition, there is the fascinating area of so-called *geometric deep learning* (see <a href="https://www.youtube.com/watch?v=w6Pw4MOzMuo&t=88s">here</a> and <a href="https://geometricdeeplearning.com/">here</a>), that I'd like to begin exploring.

I am using the word *geometry* in a very broad sense---in particular, I am *not* referring to Euclid's plane geometry that you studied in high school, so you can put away your protractor and compass. Rather, I am using the word essentially as a synonym for *topology*, which is a branch of mathematics that might be described as *abstract geometry*. Topology provides us the abstract framework to talk about "geometric" properties like smoothness and dimensionality in very general settings, and it gives us the tools to assemble "spaces" out of quite general things, like probability distributions. In fact, "spaces" of probability distributions are the central objects in *information geometry*, where they go by the name *statistical manifolds*.

The cutting-edge applications of geometry and topology to machine learning will have to come later, however. We have a good amount of preparatory work that we need to do before we can get to the research boundary. In this entirely mathematical[^foonote0] series of posts, I want to give you a glimpse into the various branches of topology and modern geometry, helping develop familiarity with some of the basic objects that appear in geometric and topological machine and deep learning.

In this first post, we will begin by discussing embedded smooth manifolds, which make for a good introduction to topology due to their concreteness. We will stick with embedded manifolds for a few posts, using the ambient euclidean spaces as a concrete setting in which to learn the rudiments of the theory. Later, we will remove our reliance on the ambient euclidean spaces and consider instead general *abstract manifolds*. The theory of these more general manifolds can be much more difficult, but having learned about embedded manifolds beforehand, we will have no problems!

[^foonote0]: A major upside to presenting the theory in an entirely mathematical, abstract framework is that you can easily apply what you've learned in other settings (e.g., physics).

*And yes, the background color of this post is white, instead of black. :) This is because the figures that I've drawn look much better on a light background.*

## Table of contents

1. <a href="#defn" style="font-family: 'Lora', serif; font-size: 1em;">Basic definitions</a>
2. <a href="#tangent" style="font-family: 'Lora', serif; font-size: 1em;">Tangent spaces and derivatives/pushforwards</a>
3. <a href="#further" style="font-family: 'Lora', serif; font-size: 1em;">Further reading</a>
4. <a href="#ref" style="font-family: 'Lora', serif; font-size: 1em;">References and footnotes</a>

## Prerequisites

Though I want to minimize the prerequisites for this series of posts as much as possible, I have to begin somewhere. If I were to assume *no* training in mathematics beyond, say, basic single-variable calculus, then I would have to write an entire book to ultimately get where I want to go.

Therefore, I've pitched these posts at the level of a junior or senior mathematics major. I'm assuming that you've had a full sequence of calculus (including multi-variable calculus), as well as a good course in linear algebra and abstract vector spaces and linear transformations. It will also be very helpful to be familiar with the basic definitions and results in the first chapter of Guillemin and Pollack's *Differential Topology*.[^GP2010]

You will also need to know the definition of *commutative $\bbr$-algebras* and their *homomorphisms*. You can look up these definitions on the internet, or see the section on <a href="#further" style="font-family: 'Lora', serif; font-size: 1em;">Further Reading</a>.

<div id="defn">
## Basic definitions
</div>

The entire theory that we will develop is based on the notion of smoothness. Therefore, the following definition is *absolutely* fundamental:

<div class="highlight-box">
**Definition.** Let $M$ be a nonempty subset of $\bbr^s$, $N$ a nonempty subset of $\bbr^r$, and let $\alpha:M \to N$ be a function. For each $p\in M$, we may write

<div style='overflow: scroll'>
\begin{equation}\notag
\alpha(p) = (\alpha^1(p),\ldots,\alpha^r(p))
\end{equation}
</div>

for some collection of functions $\alpha^i : M \to \bbr$ ($i=1,\ldots,r$) called the *component functions* of $\alpha$.

1. If $M$ is open, then $\alpha$ is called *smooth* if the partial derivatives of all orders of each component function $\alpha^i:M \to \bbr$ exist at every point $p\in M$.
2. If $M$ is a general subset of $\bbr^s$, not necessarily open, then we shall say $\alpha$ is *smooth* if it is locally extendible at each point $p\in M$ to a smooth function on an open subset in the ambient euclidean space $\bbr^s$. Precisely, we require that each $p\in M$ has an open neighborhood $V$ in $\bbr^s$ for which there exists a smooth function $\tl{\alpha}:V\to \bbr^r$ with $\alpha = \tl{\alpha}$ on $V\cap M$.
</div>

For example, the function

<div style='overflow: scroll'>
\begin{equation}\notag
\alpha: \bbr^3 \to \bbr^2, \quad \alpha(x,y,z) = (x^2y, x+yz^3)
\end{equation}
</div>

is smooth, precisely because the two component functions

<div style='overflow: scroll'>
\begin{equation}\notag
\alpha^1(x,y,z) = x^2y \quad \text{and} \quad \alpha^2(x,y,z) = x+yz^3
\end{equation}
</div>

are polynomials, which are smooth. Can you write down other examples of smooth functions?

Notice that I am writing *superscripts* to index the component functions, rather than (the more typical) subscripts. In particular, $\alpha^2$ does not stand for "$\alpha$ squared", but rather for the second component function of $\alpha$. As we will see later, the placement of indices in superscripts versus subscripts will be significant.

While reading the definition, you may have wondered if the two definitions of smoothness coincide when $M$ is open. In other words, you may have asked: If $\alpha:M \to N$ is a function on an open set $M$ which is smooth according to part (1.) of the definition, is it also smooth according to part (2.)? I suggest that you prove the answer is *yes*, and to also prove the converse, so that the two definitions are equivalent when $M$ is open.

We will need special types of smooth functions in order to define smooth manifolds:

<div class="highlight-box">
**Definition.** A function $\alpha:M \to N$ as in the definition above (where neither $M$ nor $N$ is necessarily open) is called a *diffeomorphism* if it is smooth, invertible, and if its inverse $\alpha^{-1}:N \to M$ is also smooth.
</div>

If two sets $M$ and $N$ are linked by a diffeomorphism $\alpha:M \to N$ (so that they are *diffeomorphic*), then, from our viewpoint, they are to be considered indistinguishable or "the same." In other words, the type of topology that we are studying only considers properties of sets $M$ and $N$ that are *invariant* under diffeomorphism, in the sense that if $M$ has such and such property, then so does $N$ (provided $M$ and $N$ are diffeomorphic).

As an (extremely simple) example, the real line $\bbr$ and the parabola

<div style='overflow: scroll'>
\begin{equation}\notag
N = \left\\{ (x,y) \in \bbr^2 : y=x^2\right\\}
\end{equation}
</div>

are diffeomorphic via the map $\alpha: \bbr \to N$ with $x\mapsto (x, x^2)$. Can you prove that $\alpha$ is smooth, and identify its (smooth) inverse? 

Armed with the definition of a diffeomorphism, we arrive at the main definition:

<div class="highlight-box">
**Definition.** A *smooth $n$-dimensional manifold* is a nonempty subset $M$ of an ambient euclidean space $\bbr^s$ that is locally diffeomorphic to $\bbr^n$. Precisely, we require that every $p\in M$ has an open neighborhood $V$ in $M$ for which there exists a diffeomorphism $\phi:U \to V$ with $U$ an open subset of $\bbr^n$.
</div>

The cartoon to keep in mind is the following:

![sum](/assets/images/manifold.png){:style="margin: 40px auto; display: block; width: 70%;"}

Here, I've drawn $M$ as a $2$-dimensional smooth manifold (in particular, a "two-holed torus"). You should imagine that the diffeomorphism $\phi$ is "painting" a set of local coordinate axes on $M$. Though this figure only shows *one* such diffeomorphism, the definition requires that the entire manifold $M$ is covered with these local coordinate systems. In other words, no matter what point $p\in M$ I choose, there is a diffeomorphism $\phi: U \to V$ as in the figure with $p \in V$.

Our smooth manifolds carry the subspace topologies from their ambient euclidean spaces, so the open neighborhood $V$ in the definition is a *relatively* open subset of $M$. A diffeomorphism $\phi$ as in the definition is called a *local parameterization* on $M$ and its inverse $\phi^{-1}:V\to U$ is called a *local coordinate system* or a *chart* on $M$. The coordinate functions $(\phi^{-1})^i:V\to \bbr$ ($i=1,\ldots,n$) are often suggestively written as

<div style='overflow: scroll'>
\begin{equation}\label{local-coord-eqn}
x^1,\ldots,x^n,
\end{equation}
</div>

which are often (intentially) confused with the map $\phi^{-1}$ itself and called *local coordinates* or a *local coordinate system* on $M$. Given a point $p\in M$, we shall say that \eqref{local-coord-eqn} are local coordinates *near $p$* if $p$ is in the domain $V$ of the local coordinate system $\phi^{-1}$.

Often we shall omit the modifier "smooth" and simply write "manifold" when we really mean "smooth manifold."

As with any category of mathematical objects, it's not enough to *only* define the objects, but we also need to define the appropriate maps between them:

<div class="highlight-box">
**Definition.** A function $\alpha:M \to N$ between two manifolds $M$ and $N$ is called *smooth* if it is smooth as a function between subsets of euclidean spaces (which may not be open). A smooth function will also be called a *smooth map* or simply a *map*.
</div>

So, a typical smooth map between manifolds might look something like this:

![sum](/assets/images/smooth-map.png){:style="margin: 40px auto; display: block; width: 70%;"}

Here, $\alpha:M \to N$ is a smooth map that sends a "two-holed" torus $M$ to a sphere $N$ (i.e., the surface of a ball). I tend to picture smooth maps as dynamic processes that somehow bend, twist or otherwise transform the domain manifold to land in (or on) the codomain manifold. So, I would picture $\alpha$ as some sort of (smooth) transformation that places the two-holed torus $M$ onto the surface of the sphere $N$. As an extreme example, $\alpha$ could collapse all of $M$ to a point, and then map that point to the north pole of $M$. Can you picture other examples for what $\alpha$ might do?

Though not always rigidly observed and followed, in some branches of topology and geometry it is traditional to use the word "function" as a stand-in for "$\bbr$-valued", so that a *smooth function* on a manifold $M$ is a smooth map $\alpha:M \to \bbr$. The set of such smooth functions is so important that it has its own special notation:

<div class="highlight-box">
**Notation.** We write $C^\infty(M)$ for the set of all smooth functions $f:M \to \bbr$ on a manifold $M$.
</div>

In fact, given a manifold $M$, the set $C^\infty(M)$ of smooth functions is a commutative $\bbr$-algebra with respect to the standard pointwise operations: Given two functions $f,g\in C^\infty(M)$, their *sum*, denoted $f+g$, is defined via the formula
	
<div style='overflow: scroll'>
\begin{equation}\notag    
(f+g)(p) = f(p)+g(p)
\end{equation}
</div>

for all $p\in M$, while their *product*, denoted $fg$, is defined via the formula

<div style='overflow: scroll'>
\begin{equation}\notag
(fg)(p) = f(p)g(p)
\end{equation}
</div>

for all $p\in M$. Then, given a scalar $c\in \bbr$, we define the *scalar product* of $c$ and $f$, denoted $cf$, via the formula

<div style='overflow: scroll'>
\begin{equation}\notag	
(cf)(p) = cf(p)
\end{equation}
</div>

for all $p\in M$.

In the next exercise, I want you to check that $C^\infty(M)$ actually is a commutative $\bbr$-algebra and several other things.

<div class="highlight-box2">
**Exercise.**

1. Prove that $C^\infty(M)$ is indeed a commutative $\bbr$-algebra.
2. Let $\alpha:M \to N$ be a smooth map between manifolds. Define the function
\begin{equation}\notag
\alpha^\ast: C^\infty(N) \to C^\infty(M), \quad f \mapsto \alpha^\ast f,
\end{equation}
called the *pullback of $\alpha$*, by setting $\alpha^\ast f = f\circ \alpha$. Prove that $\alpha^\ast$ is a homomorphism of $\bbr$-algebras. (See the figure below.)
3. Continuing with our smooth map $\alpha:M \to N$ from part (2.), let $\beta:N \to L$ be a second smooth map. Prove that $(\beta \circ \alpha)^\ast = \alpha^\ast \circ \beta^\ast$. If $\id_M:M \to M$ is the identity map on $M$, prove that $\id_M^\ast = \id_{C^\infty(M)}$ where $\id_{C^\infty(M)}$ is the identity map on $C^\infty(M)$.
4. If $M$ and $N$ are diffeomorphic manifolds, prove that $C^\infty(M)$ and $C^\infty(N)$ are isomorphic as $\bbr$-algebras.
</div>

A cartoon illustrating the mechanics of a pullback of a smooth map is shown here:

![sum](/assets/images/smooth-func.png){:style="margin: 40px auto; display: block; width: 70%;"}

The smooth function $f: N\to \bbr$ is defined on the codomain manifold of the smooth map $\alpha$. Notice that $f$ maps to the real line $\bbr$ in the figure, and so does $\alpha^\ast f:M \to \bbr$. The smooth map $\alpha$ maps *from* $M$ *to* $N$, but the pullback $\alpha^\ast$ goes backwards, mapping $C^\infty(N)$ to $C^\infty(M)$. This "reversal of directions" is an example of (*functorial*) *contravariance*.

The last part of the exercise is significant because it shows that the algebras of smooth functions of manifolds are diffeomorphism invariants. Thus, if you want to show that two manifolds are *not* diffeomorphic, you can do so by showing that their algebras of smooth functions are *not* isomorphic. The latter may not be any easier than the former, but it's still quite interesting because it shows that the pullback operation turns a topological problem (the non-existence of a diffeomorphism) into an algebraic problem (the non-existence of an isomorphism).[^footnotewho]

[^footnotewho]: There's an entire field of mathematics that concerns itself with "turning topology into algebra" called *algebraic topology*.

<div id="tangent">
## Tangent spaces and derivatives/pushforwards
</div>

If the pullback operation turns a smooth map into an algebra homomorphism pointing in the "opposite direction," then the *pushforward* operation turns a smooth map into a homomorphism of vector spaces pointing the "same direction." In particular, pushforwards *also* turn topology into (linear) algebra.

Pushforwards aren't really that mysterious, since they are nothing but directional derivatives with a fancy name, and you certainly know what a derivative is. So, let's begin by recalling the definition of derivatives on open sets in euclidean space:

<div class="highlight-box">
**Definition.** If $\phi:U \to \bbr^r$ is a smooth function on an open subset of a euclidean space $\bbr^s$, its *derivative at $t\in U$*, or its *pushforward at $t\in U$*, is the linear map

<div style='overflow: scroll'>
\begin{equation}\notag
\phi_{\ast t}: \bbr^s \to \bbr^r
\end{equation}
</div>

defined by

<div style='overflow: scroll'>
\begin{equation}\notag
\phi_{\ast t}(v) = \lim_{\dev \to 0} \frac{ \phi(t+\dev v) - \phi(t)}{\dev}
\end{equation}
</div>

for $v\in \bbr^s$.
</div>

With $\phi$ given as in the definition, and with respect to the standard ordered bases on $\bbr^s$ and $\bbr^r$, one may prove easily that the derivative $\phi_{\ast t}$ is represented by the $r\times s$ *jacobian matrix*

<div style='overflow: scroll'>
\begin{equation}\notag
J(\phi)\_t \defeq \left[ \frac{\bd \phi^j}{\bd t^i}(t) \right]_{ij}
\end{equation}
</div>

where $t^1,\ldots,t^s$ are the standard ordered coordinates[^footnote1] on $\bbr^s$. For more details, see Chapter 2 of ([^Spivak1965]).

[^footnote1]: To say that $t^1,\ldots,t^s$ are the "standard ordered coordinates" means that each $t^i:\bbr^s \to \bbr$ is a function with $t^i(a^1,\ldots,a^s) = a^i$ for each $n$-tuple $(a^1,\ldots,a^s) \in \bbr^s$.

The tangent spaces to a manifold are the direct generalizations of the tangent lines and planes that you studied in single- and multi-variable calculus.

<div class="highlight-box">
**Definition.** Let $p$ be a point on a smooth $n$-dimensional manifold $M$ and select a local parameterization $\phi:U \to V$ with $p\in V$. The *tangent space* of $M$ at $p$, denoted $T_p(M)$, is defined to be the image of the pushforward $\phi_{\ast t}$ where $t$ is the (unique) point in $U$ with $\phi(t) = p$.[^footnote2]

[^footnote2]: It is proved on pages 9 and 10 of ([^GP2010]) that the definition of $T_p(M)$ just given does not depend on the choice of local parameterization $\phi$ and that $\phi_{\ast t}$ is indeed injective.

Now, let $e_1,\ldots,e_n$ be the standard ordered basis[^footnote3] of $\bbr^n$ and let $x^1,\ldots,x^n$ be the local coordinates on $M$ corresponding to $\phi$. If we set

<div style='overflow: scroll'>
\begin{equation}\notag
\bd_{x^i}|\_p = \phi_{\ast t}(e_i)
\end{equation}
</div>

for each $i=1,\ldots,n$, then

<div style='overflow: scroll'>
\begin{equation}\notag
\bd_{x^1}|\_p,\ldots,\bd_{x^n}|_p
\end{equation}
</div>

is a basis for the tangent space $T_p(M)$ called the *coordinate basis* associated to the local coordinates $x^1,\ldots,x^n$.
</div>

[^footnote3]: This means that $e_i$ is the vector in $\bbr^n$ with a $1$ in the $i$-th entry and zeros elsewhere.

The rather strange choice of notation for the coordinate basis vectors will be explained when we study the relationship between tangent vectors and derivations in a later post. However, notice that the index $i$ appears in the subscript of the coordinate basis vector $\bd_{x^i}\|_p$, which means that we consider it to be a *lower* index on this basis vector. In the [series]({% post_url /tensors/2022-11-19-tensors1 %}) on tensors, we used a summation convention that said an index repeated in a single expression in both an upper and lower position is to be summed over. In view of this convention, a tangent vector $v\in T_p(M)$ may be written in components as

<div style='overflow: scroll'>
\begin{equation}\notag
v = v^i \bd_{x^i}|_p,
\end{equation}
</div>

with summation over $i$ implied (from $1$ to $n$). When specific mention of the local coordinates is not necessary, we will write $\bd_i\|\_p$ in place of $\bd_{x^i}\|_p$.

Now, having defined pushforwards of smooth maps defined on open subsets of euclidean spaces, we generalize to pushforwards of smooth maps between manifolds. So, let $\alpha:M \to N$ be a smooth map between manifolds, let $p\in M$, and set $q = \alpha(p)$. We may choose local parametrizations

<div style='overflow: scroll'>
\begin{equation}\notag
\phi: U \to V \quad \text{and} \quad \psi:W \to G
\end{equation}
</div>

on $M$ and $N$, respectively, with $p\in V$ and $q\in G$. By shrinking $U$ and $V$ if needed, we may suppose that $\alpha(V) \subseteq G$. Thus, the diagram
	
<div style='overflow: scroll'>    
\begin{equation}\notag
\begin{xy}
\xymatrix@C=1in{
V \ar[r]^{\alpha|\_V} & G \\\ U \ar[r]\_{\beta \ =\  \psi^{-1} \ \circ \ \alpha \ \circ \ \phi} \ar[u]^\phi & W \ar[u]_\psi
}
\end{xy}
\end{equation}
</div>

is well-defined and commutes. If $x^1,\ldots,x^n$ and $y^1,\ldots,y^m$ are the local coordinates on $M$ and $N$ associated with the parametrizations $\phi$ and $\psi$ (hence $M$ is $n$-dimensional while $N$ is $m$-dimensional), then the composite $\beta$ along the bottom of the diagram is called the *local coordinate representation of $\alpha$ with respect to the $x^j$'s and $y^i$'s*; a cartoon representation of the situation is given in the figure:

![sum](/assets/images/smooth-map-local-rep.png){:style="margin: 40px auto; display: block; width: 70%;"}

The jacobian matrix of $\beta$ at the point $\phi^{-1}(p)$ is denoted

<div style='overflow: scroll'>
\begin{equation}\notag
\frac{\bd(y^1\circ\alpha,\ldots,y^m\circ \alpha)}{\bd(x^1,\ldots,x^n)}(p).
\end{equation}
</div>


<div class="highlight-box">
**Definition.** Let the notation be as above and set $t = \phi^{-1}(p)$ and $u = \psi^{-1}(q)$. The *derivative of $\alpha$ at $p$*, or the *pushforward of $\alpha$ at $p$*, is defined to be the linear map

<div style='overflow: scroll'>
\begin{equation}\notag
\alpha_{\ast p} : T_p(M) \to T_q(N)
\end{equation}
</div>

given as the composite[^footnote4]

<div style='overflow: scroll'>
\begin{equation}\notag
\alpha_{\ast p} = \psi_{\ast u} \circ \beta_{\ast t} \circ (\phi_{\ast t})^{-1}.
\end{equation}
</div>

Here, in writing the inverse $(\phi_{\ast t})^{-1}$, we are viewing the derivative $\phi_{\ast t}$ as an isomorphism $\bbr^n \to T_p(M)$, not simply as an injective linear map from $\bbr^n$ to the ambient euclidean space containing $M$.
</div>

The cartoon representation of the derivative is:

![sum](/assets/images/local-derivative.png){:style="margin: 40px auto; display: block; width: 100%;"}

To the extent that the tangent spaces $T_p(M)$ and $T_q(N)$ can be considered "infinitesimal" neighborhoods of $p$ and $q$, the action of the smooth map $\alpha$ on these neighborhoods is given by a linear transformation $\alpha_{\ast p} : T_p(M) \to T_q(N)$.

[^footnote4]: Just as one proves that the tangent space $T_p(M)$ is independent of the choice of local parameterization, one may prove easily that the definition of $\alpha_{\ast p}$ does not depend on local parametrizations.

The following fundamental result is proved on page 11 of ([^GP2010]):

<div class="highlight-box">
**Theorem (Chain Rule).** Let $\alpha:M \to N$ and $\beta:N \to L$ be two smooth maps of manifolds. Then for all $p\in M$ we have

<div style='overflow: scroll'>
\begin{equation}\notag
(\beta \circ \alpha)\_{\ast p} = \beta_{\ast \alpha(p)} \circ \alpha_{\ast p}.
\end{equation}
</div>
</div>

As a sanity check, can you recover the usual single-variable chain rule from this version as a special case? I suggest you try!

Now, the derivative of a smooth map between *open sets* of euclidean spaces may be represented by a jacobian matrix. The same is true for smooth maps between manifolds, but in general, this matrix will depend on the choice of local coordinates. In fact, these jacobian matrices actually coincide with the jacobian matrices of the local coordinate representations as defined above. The first step to obtaining these jacobian matrices is to define partial derivatives of functions on a manifold, which *also* depend on the choice of local coordinates.

<div class="highlight-box">
**Definition.** Let $f\in C^\infty(M)$ be a smooth function on a manifold $M$ and let $\phi:U \to V$ be a local parameterization on $M$ with local coordinates $x^1,\ldots,x^n$. For each $i=1,\ldots,n$, define the *$i$-th partial derivative of $f$ relative to the $x^i$'s* to be the composite

<div style='overflow: scroll'>
\begin{equation}\notag
\frac{\bd f}{ \bd x^i} : V \xrightarrow{\phi^{-1}} U \xrightarrow{\frac{\bd (f\circ \phi)}{\bd t^i}} \bbr
\end{equation}
</div>

where $t^1,\ldots,t^n$ are the standard ordered coordinates on $U$.
</div>

In the next exercise, you will work out, for yourself, the relationship between partial derivatives of component functions of smooth maps and jacobian matrices.

<div class="highlight-box2">
**Exercise.**  Let $\alpha:M \to N$ be a smooth map between manifolds, let $p\in M$, and set $q = \alpha(p)$. Choose local coordinates $x^1,\ldots,x^n$ and $y^1,\ldots,y^m$ on open parametrizable neighborhoods of $p$ and $q$, respectively, making adjustments (i.e., shrinking) if needed so that the jacobian matrix

<div style='overflow: scroll'>
\begin{equation}\notag
\label{tired-eqn}
\frac{\bd(y^1\circ\alpha,\ldots,y^m\circ \alpha)}{\bd(x^1,\ldots,x^n)}(p)
\end{equation}
</div>

is defined.

1. Prove that the above jacobian matrix represents the derivative $\alpha_{\ast p}$ with respect to the coordinate bases
\begin{equation}\notag
\bd_{x^1}|\_p,\ldots, \bd_{x^n}|\_p \quad \text{and} \quad \bd_{y^1}|\_q,\ldots, \bd_{y^m}|\_q
\end{equation}
of $T_p(M)$ and $T_q(N)$.
2. Prove that the above jacobian matrix coincides with the $m\times n$ matrix
\begin{equation}\notag
\left[ \frac{\bd(y^j \circ \alpha)}{\bd x^i}(p) \right]_{ij}
\end{equation}
of partial derivatives.
</div>

<div id="further">
## Further reading
</div>

In my opinion, the best introduction to topology is Guillemin and Pollack's book *Differential Topology*.[^GP2010] My treatment of (embedded) smooth manifolds in the first few posts of this series will closely follow the first chapter of this book. A pair of very good related texts is Spivak's *Calculus on Manifolds*[^Spivak1965] and Milnor's *Topology from the Differential Viewpoint*.[^Milnore1997]

For the material in this post on commutative $\bbr$-algebras, see MacLane and Birkhoff's *Algebra*[^BirkhoffMacLane1988], particularly Chapter IX.

<div id="ref">
## References and footnotes
</div>

[^GP2010]: V. Guillemin and A. Pollack, *Differential topology*, AMS Chelsea Publishing, Providence, RI, 2010, reprint of the 1974 original.

[^Spivak1965]: M. Spivak, *Calculus on manifolds. A modern approach to classical theorems of advanced calculus*, W. A. Benjamin, Inc., New York-Amsterdam, 1965.

[^Milnore1997]: J. W. Milnor, *Topology from the differentiable viewpoint*, Princeton Landmarks in Mathematics, Princeton University Press, Princeton, NJ, 1997, based on notes by D. W. Weaver, revised reprint of the 1965 original.

[^BirkhoffMacLane1988]: S. MacLane and G. Birkhoff. *Algebra.* Chelsea Publishing Co., New York, third edition, 1988.