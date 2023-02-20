---
layout: post
title: tangent bundles
category: a geometric and topological toolkit
---

<div class="post-title">
<h1 class="accent-color">tangent bundles</h1>
</div>

The tangent space $T_p(M)$ at a point $p$ on a manifold $M$ is a purely local object, in the sense that it only depends on the "first-order infinitesimal neighborhoods" of $p$. In this post, we will see how to combine all the tangent spaces $T_p(M)$ into a single global object called the *tangent bundle*, denoted $T(M)$. While the tangent bundle $T(M)$ is composed of linear building blocks (i.e., the tangent spaces $T_p(M)$), we will see that $T(M)$ carries its own manifold structure which may have a non-trivial topology. As an example, we will explore the tangent bundle $T(S^1)$ of the unit circle $S^1$ in some detail, and we will see that $T(S^1)$ is a cylinder in $\bbr^3$.

A tangent bundle is actually a specific example of a more general structure called a (*locally trivial*) *vector bundle*, which are ubiquitous in topology. I will only have the time to state the definitions and most basic properties of these gadgets; a more thorough exploration will have to wait till a future post.

## Table of contents

1. <a href="#tan-bundle" style="font-family: 'Lora', serif; font-size: 1em;">The tangent bundle</a>
2. <a href="#circle-tan-bundle" style="font-family: 'Lora', serif; font-size: 1em;">The tangent bundle of the circle</a>
3. <a href="#vec-bundle" style="font-family: 'Lora', serif; font-size: 1em;">Tangent bundles as vector bundles</a>
4. <a href="#locally-trivial-vec-bundle" style="font-family: 'Lora', serif; font-size: 1em;">Tangent bundles as locally trivial vector bundles</a>
5. <a href="#ref" style="font-family: 'Lora', serif; font-size: 1em;">References and footnotes</a>

## Prerequisites

Of course, you'll want to be familiar with the basic definitions, notation, and terminology in the [first post]({% post_url /geom-primer/2023-01-17-geom-primer1 %}) of this series. In particular, our manifolds are embedded in euclidean spaces by definition, in the style of Guillemin and Pollack's book ([^GP2010]), which will make for a handy reference for this post.

<div id="tan-bundle">
## The tangent bundle
</div>

As a set, the tangent bundle is very easy to define. However, the tangent bundle carries an entire smooth manifold structure, which takes some time and care to define properly. While you're working through this section, I recommend taking a peek at the <a href="#circle-tan-bundle" class="article">section</a> following this one (and its figure), which gives a concrete example of a tangent bundle.

<div class="highlight-box">
**Definition.** Suppose that $M$ is an $n$-dimensional manifold embedded in an ambient euclidean space $\bbr^r$. Then each tangent space $T_p(M)$ is also in $\bbr^r$, and it makes sense to define the *tangent bundle* as a subset of $\bbr^{2r}$ to be

\begin{equation}\notag
T(M) = \left\\{ (p,v) \in M \times \bbr^r \mid v\in T_p(M) \right\\}.
\end{equation}
</div>

As I mentioned, the tangent bundle $T(M)$ is more than just a subset of $\bbr^{2r}$, it's actually a $2n$-dimensional smooth manifold. To see this, we first note that the assignment $M \mapsto T(M)$ is functorial: If $\alpha:M \to N$ is a smooth map, then there is an induced map

\begin{equation}\notag
\alpha_\ast:T(M) \to T(N), \quad (p,v) \mapsto \big(\alpha(p),\alpha_{\ast p}(v)\big),
\end{equation}

that we call the *global derivative* or *global pushforward* of $\alpha$. One checks easily that $\alpha_\ast$ is smooth, i.e., that it is locally extendible at each point $(p,v) \in T(M)$ to a smooth map on an open neighborhood of $(p,v)$ in $\bbr^{2r}$. Furthermore, by the usual chain rule, if $\beta:N \to L$ is a second smooth map, we have

\begin{equation}\notag
(\beta\circ \alpha)\_\ast = \beta_\ast \circ \alpha_\ast,
\end{equation}

and if $\id_M:M \to M$ is the identity map, then

\begin{equation}\notag
\id_{M\ast} = \id_{T(M)}.
\end{equation}

It follows immediately, as usual, that if $\alpha:M \to N$ is a diffeomorphism, then $\alpha_\ast$ is too.

Now, to get local parametrizations on $T(M)$, we let $\phi:U\to V$ be a local parametrization on $M$, where $U$ is an open subset of $\bbr^n$ and $V$ is an open subset of $M$. We then have the global derivative

\begin{equation}\notag
\phi_\ast: T(U) \to T(V)
\end{equation}

which we just saw is a diffeomorphism. Because we may identify each tangent space $T_t(U)$ with $\bbr^n$ ($t\in U$), we have that $T(U) = U \times \bbr^n$, and hence $T(U)$ is an open subset of $\bbr^{2n}$. On the other hand, because $V$ is open in $M$ and $T_p(V) = T_p(M)$ for all $p\in V$, we have

\begin{equation}\notag
T(V) = (V \times \bbr^N) \cap T(M),
\end{equation}

so $T(V)$ is an open subset of $T(M)$. We may thus take the global derivatives $\phi_\ast$ of local parametrizations of $M$ to obtain local parametrizations of $T(M)$, giving the latter the structure of a $2n$-dimensional manifold.

From this description, we can easily describe local coordinates on the codomain of a local parametrization $\phi_\ast:T(U) \to T(V)$. First, recall (from the [first post]({% post_url /geom-primer/2023-01-17-geom-primer1 %})) that the associated local coordinates $x^1,\ldots,x^n$ on the open subset $V\subseteq M$ are, by definition, the component functions of the inverse function $\phi^{-1}$, namely

\begin{equation}\notag
\phi^{-1}(p) = (x^1(p),\ldots,x^n(p)),
\end{equation}

for all $p\in V$. It is quite common to intentionally confuse the numbers $x^1(p),\ldots,x^n(p)$ with the functions $x^1,\ldots,x^n$ themselves, so that we might say (for example) the point $p\in V$ (on a $3$-dimensional manifold) has local coordinates

\begin{equation}\notag
(x^1,x^2,x^3) = (-2, 3, 0),
\end{equation}

when what we *really* mean is that

\begin{equation}\notag
(x^1(p),x^2(p),x^3(p)) = (-2, 3, 0).
\end{equation}

With respect to the local parametrization $\phi$, we also talked about the associated coordinate basis

\begin{equation}
\label{tan-basis-eqn}
\bd_1|_p,\ldots,\bd_n|_p
\end{equation}

of the tangent space $T_p(M)$ at a point $p\in V$. Thus, every vector $v\in T_p(V)$ may be written as

\begin{equation}
\label{tan-comp-eqn}
v = v^i \bd_i|_p
\end{equation}

for some (unique) collection of scalars $v^i \in \bbr$, with summation over $i$ implied.

Now, it follows immediately from our discussion that a point $(p,v) \in T(V) \subseteq T(M)$ has local coordinates given by

\begin{equation}
\label{hor-ver-eqn}
(x^1,\ldots,x^n,v^1,\ldots,v^n) \in \bbr^{2n}.
\end{equation}

Take care to make sure you understand what this means! First, I am intentionally confusing the functions $x^1,\ldots,x^n$ with the numbers $x^1(p),\ldots,x^n(p)$ as I mentioned above, and the numbers $v^1,\ldots,v^n$ are the components of $v$ displayed in \eqref{tan-comp-eqn} with respect to the associated coordinate basis \eqref{tan-basis-eqn}.

Local coordinates of the form \eqref{hor-ver-eqn} are so important that they get their own name:

<div class="highlight-box">
**Definition.** Let the notation be as above. The local coordinates $x^1,\ldots,x^n$ in \eqref{hor-ver-eqn} are called the *horizontal local coordinates* of $(p,v)$, while the local coordinates $v^1,\ldots,v^n$ are called the *vertical local coordinates*.
</div>

The language in the definition is the first of many "vertical/horizontal" dichotomies that you'd see if you continued your study of vector and fiber bundles. This language comes from how we typically draw tangent bundles, as we will see in the next section.

<div id="circle-tan-bundle">
## The tangent bundle of the circle
</div>

Given a point $p = (x,y) \in S^1$, where $S^1$ denotes the unit circle in $\bbr^2$, it's easy to see that

\begin{equation}\notag
T_p(S^1) = \left\\{ (u,v) \in \bbr^2 \mid xu+yv = 0 \right\\}.
\end{equation}

Thus

\begin{equation}\notag
T(S^1) = \left\\{ (x,y,u,v) \in \bbr^4 \mid x^2+y^2 = 1, \ xu + yv = 0 \right\\}.
\end{equation}

Now, this is all well and good, but I actually want to find a different description of $T(S^1)$. For this, we define a smooth map

\begin{equation}\notag
\alpha: S^1 \times \bbr \to T(S^1)
\end{equation}

by setting

\begin{equation}\notag
\alpha(x,y,r) = ( x,y , -yr,xr ).
\end{equation}

One shows easily that $\alpha$ is an injective immersion, and that it is also proper; hence, $\alpha$ is an embedding. But its image is easily seen to be all of $T(S^1)$, which means that it is a diffeomorphism. Thus, at least up to diffeomorphism, the tangent bundle $T(S^1)$ is the same thing as the infinite cylinder $S^1 \times \bbr$.

The structure of the tangent bundle is shown in the following figure:

![sum](/assets/images/tan-bundle-circle0.png){:style="margin: 40px auto; display: block; width: 80%;"}

In the upper left, we begin with a single tangent line to the circle $S^1$ at a point in the fourth quadrant. Moving to the upper right, we view the circle $S^1$ as embedded in the $xy$-plane in $\bbr^3$, and we physically grab the tangent line and rotate it so that it is parallel with the $z$-axis. Then, if we imagine rotating *all* tangent lines to $S^1$ in this manner, we "fill in" the infinite cylinder $S^1 \times \bbr$, which is shown in the center of the figure labeled as $T(S^1)$.

At the bottom of the figure, I have drawn a copy of $S^1$ and placed it below the tangent bundle $T(S^1)$. This is a very typical convention, where we imagine (and sometimes actually draw, if possible) the tangent bundle $T(M)$ sitting "over" the manifold $M$. In fact, the manifold $M$ is sometimes called the *base manifold* of the bundle $T(M)$, because of this vertical orientation.

I have also drawn the smooth map

\begin{equation}\notag
\pi:T(S^1) \to S^1, \quad (p,v) \mapsto p,
\end{equation}

which is often called the *bundle projection* or simply the *projection*. Notice that this map makes sense for *all* tangent bundles, so that we always have the projection map

\begin{equation}\notag
\pi:T(M) \to M, \quad (p,v) \mapsto p,
\end{equation}

for any manifold $M$. To get extra practice with the manifold structure on $T(M)$, it might be worth proving on your own that $\pi$ is indeed smooth.

Using the figure, you might be able to see the reasoning for the "vertical/horizontal" naming convention for local coordinates on a tangent bundle. Here, given a point $(p,v)\in T(S^1)$, we might take a local coordinate of the point $p\in S^1$ to be the angle $\theta$ that the line segment connecting the origin in $\bbr^2$ to $p$ makes with one of the coordinate axes. Then, this same local coordinate serves as a "horizontal" local coordinate in $T(S^1)$ which, using the figure above, you can actually see is a coordinate that measures the horizontal position of the point $(p,v)$. On the other hand, if we write $v = v^1 \bd_1\|\_p$, then $v^1$ measures the length of the vector $v$ relative to the basis vector $\bd_1\|\_p$. But $v^1$ also serves as the vertical local coordinate of $(p,v)$, whose magnitude may be interpreted as the vertical distance of the point $(p,v)$ from the "zero section"

\begin{equation}\notag
S^1_0 \defeq  \left\\{ (q,0) \in T(S^1) \mid q \in S^1\right\\}.
\end{equation}

Depending on orientations, the sign of $v^1$ tells us whether $(p,v)$ is above or below the zero section $S^1_0$.

<div id="vec-bundle">
## Tangent bundles as vector bundles
</div>

The example in the previous section shows that the tangent bundle $T(S^1)$ of the unit circle is, up to diffeomorphism, just the product manifold $S^1 \times \bbr$. Is this always true? If $M$ is an $n$-dimensional manifold, is the tangent bundle $T(M)$ just $M \times \bbr^n$, up to diffeomorphism? Of course, the answer must be *no*, because otherwise we would have just *defined* the tangent bundle $T(M)$ to be $M \times \bbr^n$.

I'll come back to this point in a moment, giving you an example of a manifold whose tangent bundle is *not* globally a product, but first I want to highlight an important property of the diffeomorphism $\alpha$ in the example of $T(S^1)$. The diffeomorphism $\alpha$ preserves the structure of both $S^1 \times \bbr$ and $T(S^1)$ as general "bundles" of vector spaces. In order to most clearly explain what I mean, it will be convenient to introduce the objects in the following definition. Before we do, however, we need to define so-called *disjoint unions*: If $\\{S_i\\}_{i\in I}$ is a collection of sets indexed by a set $I$, then the *disjoint union* of the $S_i$'s is

\begin{equation}\notag
\bigsqcup_{i\in I} S_i \defeq \bigcup_{i\in I} \\{i\\} \times S_i.
\end{equation}

In this notation, I will leave it to you to check that

\begin{equation}\label{tan-disjoint-eqn}
T(M) = \bigsqcup_{p\in M} T_p(M).
\end{equation}

Now, we come to the fundamental definition:

<div class="highlight-box">
**Definition.** A *basic vector bundle* over a manifold $M$ is a set $E$ of the form

\begin{equation}\notag
E = \bigsqcup_{p\in M} E_p,
\end{equation}

where each $E_p$ is a vector space. Every such basic vector bundle comes equipped with the natural projection map

\begin{equation}\notag
\pi: E \to M, \quad (p,v) \mapsto p
\end{equation}

whose fibers $\pi^{-1}(p)$ are the subsets $\\{p\\}\times E_p$. We shall often confuse the fiber $\pi^{-1}(p)$ with the vector space $E_p$, and refer to $E_p$ as a fiber of $\pi$.

If all the vector spaces $E_p$ are finite-dimensional with common dimension $k$, then $E$ is called a *rank-$k$ basic vector bundle*. The space $M$ is called the *base* of the basic vector bundle, while $E$ is called the *total space*.

If

\begin{equation}\notag
E' = \bigsqcup_{p\in M} E_p'
\end{equation}

is a second basic vector bundle over $M$ with natural projection $\pi' : E' \to M$, then a *homomorphism* of basic vector bundles is a set-theoretic function $\alpha:E \to E'$ that restricts to a linear transformation
\begin{equation}\notag
\alpha|_{E_p}:E_p \to E_p'
\end{equation}

on each fiber. To be clear, this means that we require $\alpha(E_p) \subseteq E_p'$ for each $p\in M$, where we are identifying $E_p$ and $E_p'$ with the actual fibers $\pi^{-1}(p)$ and $(\pi')^{-1}(p)$ as described above. Instead of writing $\alpha\|\_{E\_p}$ for the restricted map, we shall often write $\alpha\_p$ instead.

We shall say the homomorphism $\alpha:E \to E'$ is an *isomorphism* of basic vector bundles if there is a homomorphism of basic vector bundles $\beta:E'\to E$ such that $\beta \circ \alpha = \id_E$ and $\alpha \circ \beta = \id_{E'}$.
</div>

Note immediately that, according to \eqref{tan-disjoint-eqn}, the tangent bundle $T(M)$ is a basic vector bundle.

Why do we use the awkward modifier *basic*? The reason is, that the unqualified terminology *vector bundle* often refers to a so-called *locally trivial vector bundle*, which is a vector bundle $E$ that carries a smooth manifold structure such that the natural projection $\pi: E \to M$ is smooth, and such that $E$ is locally isomorphic to a *trivial* vector bundle. Our *basic vector bundles* serve as the underlying structure for these more complicated types of vector bundles. We will see below that the tangent bundle $T(M)$ is a particular example of a *locally trivial vector bundle*, saving a more thorough and general investigation to the next post in this series.

Another (perhaps more descriptive) name for a *basic vector bundle* might be a *set-theoretic vector bundle*.

A homomorphism $\alpha: E\to E'$ of basic vector bundles is completely determined by its restrictions $\alpha_p : E_p \to E_p'$ to the fibers. Indeed, the requirement that $\alpha(E_p) \subseteq E_p'$ means that $\alpha$ is described by the formula

\begin{equation}\notag
\alpha(p,v) = (p,\alpha_p(v)).
\end{equation}

If $\beta:E'\to E''$ is a second homomorphism of basic vector bundles, then the composite $\beta \circ \alpha$ looks like

\begin{equation}\notag
(\beta \circ \alpha)(p,v) = (p,\beta(\alpha(p))).
\end{equation}

To help make sure you understand these formulas, try your hand at the next exercise. Roughly, it shows that a homomorphism of basic vector bundles can be thought of as a "bundle" of linear transformations.

<div class="highlight-box2">
**Exercise.**

1. Let $\alpha:E \to E'$ be an isomorphism of basic vector bundles. Prove that for each $p\in M$, the linear transformations $\alpha_p:E_p \to E_p'$ are isomorphisms of vector spaces.
2. Conversely, suppose that we have a collection $\\{\alpha_p: E_p \to E_p'\\}_{p\in M}$ of homomorphisms of vector spaces. Show that there is an homomorphism $\alpha: E \to E'$ of basic vector bundles whose restrictions to the fibers are $\alpha_p$'s. Show that if the $\alpha_p$'s are isomorphisms, then $\alpha$ is an isomorphism as well.
</div>

While the result in (1.) is always true, even for basic vector bundles that carry "more structure," the result in (2.) might fail. Thus, it's important to realize that (2.) only applies to our *basic vector bundles*.

Given any manifold $M$, there's a really easy way to manufacture a rank-$k$ basic vector bundle over $M$ by simply taking

\begin{equation}\notag
M \times \bbr^k = \bigsqcup_{p\in M} \bbr^k.
\end{equation}

This basic vector bundle is called a *trivial basic vector bundle*.

Now, for an easy exercise:

<div class="highlight-box2">
**Exercise.** Prove that the diffeomorphism $\alpha: S^1 \times \bbr \to T(S^1)$ from the previous section is an isomorphism of basic vector bundles, where we view $S^1 \times \bbr$ as the total space of the trivial rank-$1$ basic vector bundle over $S^1$.
</div>

We now come to another central definition:

<div class="highlight-box">
**Definition.** Let $M$ be an $n$-dimensional manifold. We shall say that the tangent bundle $T(M)$ is *trivial* if there is a diffeomorphism $\alpha: M\times \bbr^n \to T(M)$ that is also an isomorphism of basic vector bundles (here, $M\times \bbr^n$ is the total space of the trivial vector bundle). The diffeomorphism $\alpha$ is called a *(global) trivialization* of the tangent bundle, and, in this case, we shall say $M$ is *parallelizable*.
</div>

Thus, we have shown that the manifold $S^1$ is parallelizable. Lest you believe that *all* manifolds are parallelizable, I offer:

<div class="highlight-box">
**Example.** I claim that the sphere $S^2$ is *not* parallelizable, which means that there does *not* exist a diffeomorphism

\begin{equation}\notag
\alpha: S^2 \times \bbr^2 \to T(S^2)
\end{equation}

which is an isomorphism of basic vector bundles. In general, non-existence proofs are very difficult in topology, but in this case we get lucky. For *if* such a diffeomorphism $\alpha$ exists, then we consider the smooth map

\begin{equation}\notag
X: S^2 \to S^2 \times \bbr^2 \xrightarrow{\cong} T(S^2)
\end{equation}

where the first unlabeled map is given by $p \mapsto (p,v_0)$ for some fixed nonzero vector $v_0\in \bbr^2$. We can then interpret $X$ as an assignment of a nonzero tangent vector in $T_p(S^2)$ to every $p\in S^2$. But no such assignment exists! Indeed, this is a consequence of the theorem stated <a href="https://en.wikipedia.org/wiki/Hairy_ball_theorem">here</a>.
</div>

Here's another pair of exercises on parallelizable manifolds. I bet the appendix in ([^Milnore1997]) will be helpful for the second exercise.

<div class="highlight-box2">
**Exercise.** 

1. Prove that the torus $T = S^1 \times S^1$ is parallelizable.
2. Are all $1$-dimensional manifolds parallelizable? Prove your answer.
</div>

<div id="locally-trivial-vec-bundle">
## Tangent bundles as locally trivial vector bundles
</div>

While not all tangent bundles are globally trivial, they are all *locally* trivial in the sense made precise in the next theorem. Before I state it, note that if $V\subseteq M$ is a nonempty open subset of a manifold $M$, then the preimage

\begin{equation}\notag
\pi^{-1}(V) = \left\\{(p,v) \in T(M) \mid \pi(p,v) \in V\right\\}
\end{equation}

is simply the tangent bundle $T(V)$, which is an open subset of $T(M)$. The projection $\pi: T(M) \to M$ restricts to the natural smooth projection

\begin{equation}\notag
\pi|_{T(V)} : T(V) \to V.
\end{equation}

<div class="highlight-box">
**Theorem.** Let $M$ be an $n$-dimensional manifold with tangent bundle $T(M)$. For every point $p\in M$, there is an open neighborhood $V$ of $p$ such that the tangent bundle $T(V)$ is trivial. In other words, there is a diffeomorphism

\begin{equation}\notag
\alpha: V \times \bbr^n \to T(V) = \pi^{-1}(V)
\end{equation}

that is also an isomorphism of basic vector bundles.
</div>

For proof, let $\phi:U \to V$ be a local parametrization on $M$ containing $p$ in its codomain, and suppose that $\phi(t) = p$. Then we know that the global derivative

\begin{equation}\notag
\phi_\ast: T(U) \to T(V)
\end{equation}

serves as a local parametrization of the tangent bundle $T(M)$. Now, note that the diagram

\begin{equation}\notag
\begin{xy}
\xymatrix@C=1in{
\color{white}V \times \bbr^n \ar@[white][d]\_{\color{white}\pi_1} \ar@[white][r]^{\color{white}\phi^{-1} \times \bbr^n}\_{\color{white}\cong} & \color{white}U \times \bbr^n = T(U) \ar@[white][r]^{\color{white}\phi_\ast}\_{\color{white}\cong} & \color{white}T(V) \ar@[white][d]^{\color{white}\pi|\_{T(V)}} \\\ \color{white}V \ar@[white][rr]_{\color{white}=} &  & \color{white}V }
\end{xy}
\end{equation}

commutes. Furthermore, the (smooth!) composite across the top row is given on the fibers by the map

\begin{equation}\notag
\\{p\\} \times \bbr^n \to \\{p\\} \times T_p(M), \quad (p,v) \mapsto (p,\phi_{\ast t}(v)),
\end{equation}

which is a linear isomorphism. Q.E.D.

Keeping the notation of the proof, take care to note the difference between the diffeomorphism $\alpha:V \times \bbr^n \to T(V)$ and the local parametrization $\phi_\ast: U \times \bbr^n \to T(V)$: The first has domain $V \times \bbr^n$, where $V$ is an open subset of the manifold $M$, where the latter has domain $U \times \bbr^n$, where $U$ is an open subset of $\bbr^n$.

<div class="highlight-box">
**Definition.** Let $M$ be an $n$-dimensional manifold and $V$ an open subset of $M$. Any diffeomorphism

\begin{equation}\notag
\alpha:V \times \bbr^n \to T(V)
\end{equation}

as in previous theorem, where $T(V)$ is viewed as an open subset of the tangent bundle $T(M)$, is called a *local trivialization* of $T(M)$. In this case, we also say that $T(M)$ *trivializes over $V$*.
</div>

We have thus shown that, while an arbitrary tangent bundle $T(M)$ may not be globally trivial, it is always locally trivial in the sense of the theorem.

<div id="ref">
## References and footnotes
</div>

[^GP2010]: V. Guillemin and A. Pollack, *Differential topology*, AMS Chelsea Publishing, Providence, RI, 2010, reprint of the 1974 original.

[^Milnore1997]: J. W. Milnor, *Topology from the differentiable viewpoint*, Princeton Landmarks in Mathematics, Princeton University Press, Princeton, NJ, 1997, based on notes by D. W. Weaver, revised reprint of the 1965 original.