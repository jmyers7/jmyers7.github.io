---
layout: post
title: the algebraic theory III&#58 local geometry, vector bundles, and sheaves of modules
category: a geometric and topological toolkit
sections:
- prerequisites
- sheaves of modules
- locally free modules
- vector bundles
- locally trivial vector bundles and reduction of structure groups
- infinitesimal geometric structures, examples
- locally trivial vector bundles to locally free modules
- locally free modules to locally trivial vector bundles
- the main equivalence
- appendix, construction lemmas
- references
---

One cannot overstate the importance of the notion of vector bundle in the local geometric theory of manifolds. Indeed, the local (or infinitesimal) geometry on a manifold $M$ takes place in its tangent spaces $T_p(M)$, and one wants these geometries to be glued together smoothly and coherently as one transitions from one tangent space to another. This notion is made precise by first observing that each of these geometries comes with its own group $G$ of linear transformations that preserve the features of the geometry; for example, the orthogonal groups $G = \O(n)$ for euclidean geometry, the indefinite orthogonal group $G = \O(1,3)$ for Minkowski geometry, the symplectic groups $G=\Sp(2n)$ for symplectic geometry, and the complex general linear groups $G=\GL(n,\bbc)$ for (almost) complex geometry. Then, this "smooth dependence" of the geometry in the tangent space $T_p(M)$ on the point $p$ is captured precisely by certain families of linear transformations in the appropriate $G$ that smoothly depend on $p$. I'm speaking here of so-called *$G$-reductions* of the tangent bundle $T(M)$, which are some of the main objects that we will study in this post. Thus, the vector bundle structure of $T(M)$ is intimately related---through group theory---to the various types of local geometries that may be placed on the manifold $M$.

In certain situations, these local geometries are *integrable*, which means that a special $G$-reduction exists which is given by the derivatives of the transition maps on the base manifold $M$. Whether a given geometry is integrable or not is a *very* important one; for example, the difference between an integrable $\O(n)$-reduction and a non-integrable one is the difference between a flat and curved riemannian manifold. On the other hand, sometimes every $G$-reduction is integrable, as is the case for $\Sp(2n)$-reductions, which is essentially Darboux's Theorem.

Though the tangent bundle $T(M)$ is front and center in this story, other vector bundles over $M$ also play an important role. For example, every one of the geometries that I referenced above may equivalently be encoded in certain smooth tensor fields over $M$ with various properties like (anti)symmetry and non-degeneracy. Tensor fields in general are properly defined as smooth sections of vector bundles manufactured from tensor products of the tangent and cotangent bundles over $M$---if one is therefore fairly convinced that these latter vector bundles are worth studying, then it's not too big of a leap to the study of general locally trivial vector bundles. In this post, we will study vector bundles in general, with a special focus on the locally trivial ones. (For some authors, every vector bundle *is* locally trivial.)

A vector bundle over $M$ is technically not just another manifold, but rather a certain type of smooth map $\pi:E \to M$ where $E$ is called the *total space* (with $E=T(M)$, in the case of the tangent bundle). Sometimes, however, the total space $E$ plays an intermediary role, and it's really the modules of *sections* of the vector bundle that are primary. These collections of sections form *sheaves of modules*, which are special types of sheaves which we studied in the previous post. You have already seen examples of these gadgets; for example, vector fields on $M$ as sections of the tangent bundle form a sheaf of modules, as do smooth functions on $M$ as sections of the trivial rank-$1$ vector bundle. One of the major results of this post is that one can actually throw away the (locally trivial) vector bundle completely, keeping only its modules of sections, and essentially lose no information. This is formalized as an equivalence between the categories of locally trivial vector bundles and locally free sheaves of modules, which I will prove in the last section. Though this equivalence is well-known, my treatment here is considerably more detailed than the typical references (at least the ones on my bookshelf).













{% assign post_num = page.slug | slice: -1, 1 %}
{% assign sec_num = 1 %}
{% assign sec_idx = 0 %}
<section data-sec-title="{{ post_num }}.{{ sec_num }}. {{ page.sections[sec_idx] }}">
## {{ post_num }}.{{ sec_num }}. {{ page.sections[sec_idx] }}

You should at least glance through the [previous post]({% post_url /geom-primer/2023-03-11-geom-primer4 %}) to familiarize yourself with sheaves and the notion of manifolds as locally ringed spaces. For those who might already know a little about locally ringed spaces, let me note that I am actually only considering special types:

<div class="highlight-box2">
**Important note!** Throughout this post, the structure sheaf $\sco_X$ of a locally ringed space $X$ will be assumed to be a sheaf of continuous $\bbr$-valued functions that contain the constant functions.
</div>

A firm command of basic commutative algebra is still required, including rings, algebras and their homomorphisms; modules and their homomorphisms; tensor products; and local rings.

A handy reference for details in sheaf theory is Tennison's book cited in the <a href="#references">References</a>. My treatment of $G$-reductions and infinitesimal geometric structures is closely modeled on Conlon's book on manifold theory, which is also a very nice reference. I am not assuming any prerequisite knowledge from either of these texts, however.
</section>










{% assign sec_num = sec_num | plus: 1 %}
{% assign sec_idx = sec_idx | plus: 1 %}
<section data-sec-title="{{ post_num }}.{{ sec_num }}. {{ page.sections[sec_idx] }}">
## {{ post_num }}.{{ sec_num }}. {{ page.sections[sec_idx] }}

While we defined sheaves in the previous post, we did not define *morphisms* of sheaves. We do so now, restricting to the case of sheaves of sets:

<div class="highlight-box">
**Definition.** Let $X$ be a topological space.

* Let $\cale$ and $\cale'$ be sheaves of sets on a topological space $X$. A *morphism* of sheaves, denoted $\eta:\cale \to \cale'$, is a natural transformation of the underlying functors. In other words, such a *morphism* is a collection of functions
    \begin{equation}\notag
    \eta_U: \cale(U) \to \cale'(U),
    \end{equation}
one for each open set $U\subseteq M$, that commute with the restriction maps of $\cale$ and $\cale'$.

* The *identity morphism*
    \begin{equation}\notag
    \id_\cale: \cale \to \cale
    \end{equation}
of the sheaf $\cale$ is defined by setting $(\id_{\cale})\_U = \id_{\cale(U)}$ for each open set $U$.

* If $\eta': \cale' \to \cale''$ is a second morphism of sheaves, the *composition*
    \begin{equation}\notag
    \eta' \circ \eta: \cale \to \cale''
    \end{equation}
is defined by setting $(\eta' \circ \eta)_U = \eta'_U \circ \eta_U$ for each open set $U$.

With sheaves of sets as objects, and with these morphisms, identity morphisms, and composition law, we obtain the *category of sheaves on $X$*, denoted $\Sh_X$.
</div>

There are multiple ways to transport sheaves from one topological space to another. One of the simplest is defined in:

<div class="highlight-box">
**Definition.** Let $\cale$ be a sheaf of sets on a topological space $X$ and let $\alpha:X \to Y$ be a continuous map of topological spaces. We define the *direct image of $\cale$ along $\alpha$*, denoted $\alpha_\ast \cale$, to be sheaf in $\Sh_Y$ defined on sections by

\begin{equation}\notag
(\alpha_\ast\cale)(U) = \cale(\alpha^{-1}(U)).
\end{equation}
</div>

<div class="highlight-box2">
**Exercise.**

1. Complete the definition of the direct image $\alpha_\ast \cale$ by describing its (obvious) restriction maps.

2. Let $\alpha:(X,\sco_X) \to (Y,\sco_Y)$ be a morphism of ringed spaces. Recall that this means $\alpha:X \to Y$ is a continuous map such that for each open set $V$ in $Y$, the function
    \begin{equation}\notag
    \alpha^\ast_V: \sco_Y(V) \to \sco_X(\alpha^{-1}(V)), \quad f\mapsto f\circ \alpha,
    \end{equation}
is a well-defined homomorphism of $\bbr$-algebras. (Remember that the structure sheaves of our ringed spaces are assumed to be sheaves of $\bbr$-valued functions!) Prove that these pullbacks $\alpha^\ast_V$ assemble together to yield a morphism
    \begin{equation}\notag
    \alpha^\ast: \sco_Y \to \alpha_\ast \sco_X
    \end{equation}
of sheaves over $Y$.
</div>


If $X$ is a locally ringed space, we defined the stalks $\sco_{X,p}$ of the structure sheaves in the previous post. This definition was the obvious adaptation of the definition of the local rings $C^\infty_{M,p}$ over a manifold $M$. In both cases, the structure sheaves were sheaves of actual functions, and the germs in the stalks were certain equivalence classes of functions. (Remember, we are technically working with special types of locally ringed spaces, in which the structure sheaves are *required* to be sheaves of functions!)

For a general abstract sheaf $\cale$ on a topological space $X$, the sections in $\cale(U)$ may not be functions. Nevertheless, it is still possible to define stalks $\cale_p$ following essentially the same recipe.

<div class="highlight-box">
**Definition.** Let $\cale$ be a sheaf of sets on a topological space $X$. Suppose we are given a point $p\in X$ and two sections $s_U\in \cale(U)$ and $t_V\in \cale(V)$, where $U$ and $V$ are open neighorhoods of $p$. We define $s_U$ and $t_V$ to be *equivalent* if there is an open neighborhood $W$ of $p$ contained in $U\cap V$ such that

\begin{equation}\notag
r^U_{W}(s_U) = r^V_W(t_V),
\end{equation}

where $r^U_W$ and $r^V_W$ are the restriction maps of the sheaf $\cale$. This defines an equivalence relation on the set

\begin{equation}\notag
\\{s_U \in \cale(U) : \text{$U$ an open neighborhood of $p$} \\}
\end{equation}

whose equivalence classes are called *germs at $p$*. We define the *stalk* of $\cale$ at $p$, denoted $\cale_p$, to be the set of all germs at $p$.
</div>

<div class="highlight-box2">
**Exercise.**

1. Prove that the equivalence relation just described actually is an equivalence relation.

2. Let $\eta: \cale \to \cale'$ be a morphism of sheaves of sets on $X$. For each $p\in X$, prove that the induced map
    \begin{equation}\notag
    \eta_p: \cale_p \to \cale'_p, \quad [s_U] \mapsto [\eta_U(s_U)],
    \end{equation}
on stalks is well-defined. Here, I am writing $[s_U]$ to denote the germ represented by a section $s_U \in \cale(U)$.

*Note*: Following our usual practice, when no confusion will likely arise, we will drop the bars and the subscript from the notation $[s_U]$ and simply write $s$. We will even call elements in $\cale_p$ *sections*, when technically they are *germs* of sections.
</div>

We now give the first of the main definitions in this post:

<div class="highlight-box">
**Definition.** Let $X$ be a locally ringed space.

* An *$\sco_X$-module* is a sheaf of sets $\cale$ such that, for each open set $U\subseteq X$, the set $\cale(U)$ is a module over the ring $\sco_X(U)$. Furthermore, if $U\subseteq V$ is a containment of open sets and
    \begin{equation}\notag
    \rho^V_U: \sco_X(V) \to \sco_X(U) \quad \text{and} \quad r^V_U:\cale(V) \to \cale(U)
    \end{equation}
are the associated restriction maps, then we require $r^V_U$ to be $\sco_X(V)$-linear, where $\cale(U)$ is given an $\sco_X(V)$-module structure by restricting scalars along $\rho^V_U$.

* An element $s\in \cale(U)$, where $\cale$ is an $\sco_X$-module, is called a *(local) section over $U$*. The module $\cale(U)$ is called a *module of sections*.

* A morphism $\eta:\cale \to \cale'$ of the underlying sheaves of two $\sco_X$-modules is called *$\sco_X$-linear* if each function
    \begin{equation}\notag
    \eta_U: \cale(U) \to \cale'(U)
    \end{equation}
is $\sco_X(U)$-linear.

* We define the *identity morphism* of an $\sco_X$-module to be its identity morphism as a sheaf in $\Sh_X$, and we define the *composition* of two $\sco_X$-linear morphisms to be their composition in $\Sh_X$.

With $\sco_X$-modules as objects, $\sco_X$-linear morphisms as morphisms, and with these identity morphisms and composition law, we obtain the *category of $\sco_X$-modules*, denoted $\Mod_X$.
</div>

<div class="highlight-box2">
**Exercise.**

1. We can easily give one obvious (but important!) example of an $\sco_X$-module: Convince yourself that the structure sheaf $\sco_X$ is an $\sco_X$-module.

2. Prove that the stalk $\cale_p$ of an $\sco_X$-module is a $\sco_{X,p}$-module with respect to the evident operations. (If you've read through the previous two posts, you've done an exercise similar to this twice!)

3. Let $\eta: \cale \to \cale'$ be an $\sco_X$-linear morphism. For each $p\in X$, prove that the induced map on stalks $\eta\_p: \cale\_p \to \cale'\_{p}$ is $\sco_{X,p}$-linear.
</div>

Restricted sheaves and direct sums of sheaves will be vitally important when we talk about locally freeness. The first of these is defined in:

<div class="highlight-box">
**Definition.** Let $\cale$ be a sheaf of sets on a topological space $X$. For an open set $U\subseteq X$, we define the *restricted sheaf*, denoted $\cale\|\_U$, to be the sheaf in $\Sh_U$ given by

\begin{equation}\notag
\cale\|\_U(V) = \cale(V),
\end{equation}

for all open sets $V\subseteq U$.
</div>

<div class="highlight-box2">
**Exercise.**
1. Complete the definition of the restricted sheaf $\cale\|\_U$ by describing its (obvious) restriction maps.

2. Suppose now that $X$ is a locally ringed space.

    * For each open set $U\subseteq X$, show that $(U,\sco_U)$ is a locally ringed space, where $\sco_U$ is defined to be the restricted sheaf $\sco_X\|\_U$. 

    * Prove that the inclusion map $\iota:U \to X$ induces a morphism $\iota:(U,\sco_U) \to (X,\sco_X)$ of locally ringed spaces.
    
    * Prove that the associated morphism of sheaves $\iota^\ast: \sco_X \to \iota_\ast \sco_U$ induces an isomorphism $\iota^\ast_p : \sco_{X,p} \to \sco_{U,p}$ of stalks as local $\bbr$-algebras.

3. Building off of (2.), suppose that $\cale$ is a $\sco_X$-module. Show that the restricted sheaf $\cale\|\_U$ is an $\sco_U$-module over the locally ringed space $(U,\sco_U)$.

4. Building off of (3.), for each $p\in U$, prove that the stalks $(\cale\|\_{U})\_p$ and $\cale\_p$ are naturally isomorphic as $\sco_{X,p}$-modules, where the first stalk is given an $\sco_{X,p}$-module structure by restricting scalars along the isomorphism $\iota^\ast_p$.
</div>

And now, direct sums:

<div class="highlight-box">
**Definition.** Let $\cale$ and $\cale'$ be two $\sco_X$-modules over a locally ringed space $X$. We define their *direct sum*, denoted $\cale \oplus \cale'$, to be the sheaf defined on sections by

\begin{equation}\notag
(\cale \oplus \cale')(U) = \cale(U) \oplus \cale'(U).
\end{equation}
</div>

<div class="highlight-box2">
**Exercise.**
1. Complete the definition of the direct sum $\cale \oplus \cale'$ as a sheaf in $\Sh_X$ by describing its (obvious) restriction maps. Then, show that $\cale \oplus \cale'$ is indeed an $\sco_X$-module.

2. Show that restriction of $\sco_X$-modules to open sets commutes with direct sums. That is, for two $\sco_X$-modules $\cale$ and $\cale'$ and an open set $U\subseteq X$, show that
    \begin{equation}\notag
    (\cale \oplus \cale')\|\_U = \cale\|\_U \oplus \cale'\|\_U
    \end{equation}
as $\sco_U$-modules.

3. Prove that the natural maps on sections
    \begin{equation}\notag
    \cale(U) \leftrightarrows \cale(U) \oplus \cale'(U) \rightleftarrows \cale'(U)
    \end{equation}
assemble together to yield well-defined $\sco_X$-linear morphisms
    \begin{equation}\notag
    \cale \leftrightarrows \cale \oplus \cale' \rightleftarrows \cale'
    \end{equation}

4. For each $p\in X$, prove that the natural maps in (3.) induce an $\sco_{X,p}$-linear isomorphism
    \begin{equation}\notag
    (\cale \oplus \cale')_p \cong \cale_p \oplus \cale'_p.
    \end{equation}

5. Generalize the definition of binary direct sums to the case of a direct sum
    \begin{equation}\notag
    \cale_1 \oplus \cdots \oplus \cale_k
    \end{equation}
of an arbitrary (finite) number of $\sco_X$-modules. In particular, conclude that each direct sum
    \begin{equation}\notag
    \sco_X^k \defeq \underbrace{\sco_X \oplus \cdots \oplus \sco_X}\_{\text{$k$ summands}}
    \end{equation}
is an $\sco_X$-module.
</div>

The direct sum of sheaves of modules is built section-wise from direct sums of modules of sections. In particular, this is an example where a natural operation on modules induces a natural operation on sheaves of modules by applying the operation to modules of sections. This is the first time that we're seeing this process in action, but we will see it again (repeatedly!) in the next post when we discuss many more operations on sheaves of modules.

I pointed out above that sections $s\in \cale(U)$ are *not* actual functions, they are simply elements in abstract modules. While that's true, they actually induce, in a very natural way, certain functions whose codomains are made up of the *stalks* and the *fibers* of the module. While we defined *stalks* above, we haven't met *fibers* yet; here's their definition:

<div class="highlight-box">
**Definition.** Let $X$ be a locally ringed space.

* The *residue field* at a point $p\in X$ is the field
    \begin{equation}\notag
    \kappa(p) = \sco_{X,p}/\mfm_p,
    \end{equation}
where $\mfm_p$ is the maximal ideal in the local ring $\sco_{X,p}$.

* Let $\cale$ be an $\sco_X$-module. The *fiber* of $\cale$ at the point $p\in X$ is the $\kappa(p)$-vector space
    \begin{equation}\notag
    E_p \defeq \cale_{p} \otimes_{\sco_{X,p}} \kappa(p) \cong \cale_p / \mfm_p \cale_p,
    \end{equation}
where $\cale_p$ is the stalk at $p$.

*Note*: Take care to notice the typographical difference between the stalk and fiber! The former is written in the calligraphic font $\cale_p$, while the latter is in the standard roman font $E_p$. They are *different* objects!
</div>

With the definition of *fiber* in hand, let me explain how a section $s\in \cale(U)$ may be conceptualized as an actual function in two different---but related---ways. Suppose that for each $p\in U$, we write $s(p)$ for the image of $s$ in the stalk $\cale_p$ under the localization map

\begin{equation}\label{loc-eqn}
\cale(U) \to \cale_p
\end{equation}

sending every section to its germ in the stalk. Then, if we take the disjoint union of the stalks, we get a function which, by an abuse of notation, we denote using the same symbol as the section:

\begin{equation}\label{etale-eqn}
s: U \to \bigsqcup_{p\in U} \cale_p, \quad p \mapsto s(p).
\end{equation}

In this way, the section $s$ becomes an actual function, but its codomain is a disjoint union of stalks which is (perhaps) a rather strange object the first time you meet it.

We can play the same game with fibers. Indeed, there is also the quotient map from the stalk to the fiber:

\begin{equation}\label{fib-eqn}
\cale_p \to \cale_p/\mfm_p \cale_p = \cale_p \otimes_{\sco_{X,p}} \kappa(p) = E_p.
\end{equation}

If we now write $s(p)$ for the image of $s$ in the fiber $E_p$ under the composition of \eqref{loc-eqn} and \eqref{fib-eqn}, then we have another function which, by a second abuse of notation, we denote using the same symbol:

\begin{equation}\label{vb-eqn}
s: U \to \bigsqcup_{p\in U} E_p, \quad p \mapsto s(p).
\end{equation}

Thus, the single section $s$ may be identified either with a function \eqref{etale-eqn} into a disjoint union of stalks, or with a function \eqref{vb-eqn} into a disjoint union of fibers.

It turns out that a pair of very beautiful theories may be developed based on these identifications of sections with actual functions. In the first case, when we think of functions of the form \eqref{etale-eqn}, we obtain the theory of <a href="https://ncatlab.org/nlab/show/%C3%A9tale+space#:~:text=An%20%C3%A9tale%20space%20(or%20%C3%A9tale,%5Cto%20p(U)%20.">étale spaces</a>, which will prove to be very important in the next post when we discuss operations on sheaves of modules. In the second case, when we think of functions of the form \eqref{vb-eqn}, we obtain the theory of vector bundles, which is the subject of this post!

In fact, this idea of thinking of abstract sections $s\in \cale(U)$ as actual functions \eqref{vb-eqn} will be so important that we formalize it, along with several other notions, in:

<div class="highlight-box" id="mod-eval">
**Definition.** Let $\cale$ be an $\sco_X$-module over a locally ringed space $X$ with fibers 

\begin{equation}\notag
E_p = \cale_p \otimes_{\sco_{X,p}} \kappa(p).
\end{equation}

* For all nonempty open sets $U$ in $X$, define the *evaluation map over $U$* to be the function
    \begin{equation}\notag
    \ev_{\cale,U}: U \times \cale(U) \to \bigsqcup_{p\in U} E_p, \quad (p,s) \mapsto (p,s(p)),
    \end{equation}
where $s(p)$ is the image of $s$ in the fiber $E_p$.

* For all nonempty open sets $U$ in $X$, define the *adjoint evaluation map over $U$* to be the function
    \begin{equation}\notag
    \ev_{\cale,U}^\ast: \cale(U) \to \text{Fun}\Big(U, \bigsqcup_{p\in U} E_p \Big),
    \end{equation}
where the target is the set of all (set-theoretic) functions from $U$ to the disjoint union and
    \begin{equation}\notag
    \ev_{\cale,U}^\ast(s)(p) = (p,s(p)), \quad \forall s\in \cale(U), \ p\in U.
    \end{equation}

* Given a point $p\in X$ and an integer $k\geq 1$, we define
    \begin{equation}\notag
    \ev_{\sco_X^k,p} : \kappa(p)^k \to \bbr^k
    \end{equation}
to be given by
    \begin{equation}\notag
    (f_1,\ldots,f_k) \mapsto (f_1(p),\ldots,f_k(p)), \quad \forall f_1,\ldots,f_k \in \kappa(p).
    \end{equation}
Notice that $\ev_{\sco_X^k,p}$ is a $\kappa(p)$-linear isomorphism.

* Since the direct sums $\sco_X^k$ are $\sco_X$-modules, we have the evaluation map over a nonempty open subset $U$
    \begin{equation}\label{eval-loc-eqn}
    \ev_{\sco_X^k,U} : U \times \sco_X(U)^k \to \bigsqcup_{p\in U} \kappa(p)^k.
    \end{equation}
However, since we have $\kappa(p) \cong \bbr$, it will be convenient to redefine the evaluation map \eqref{eval-loc-eqn} to be the map
    \begin{equation}\notag
    \ev_{\sco_X^k,U} : U \times \sco_X(U)^k \to \bigsqcup_{p\in U} \bbr^k = U \times \bbr^k
    \end{equation}
given by
    \begin{equation}\notag
    (p,f_1,\ldots,f_k) \mapsto (p,f_1(p),\ldots,f_k(p)), \quad \forall f_1,\ldots,f_k \in \sco_X(U), \ p\in U.
    \end{equation}
</div>

We also need to observe that linear morphisms of sheaves of modules induce linear transformations on fibers:

<div class="highlight-box2" id="fiber-map">
**Exercise.** Just as every morphism $\eta: \cale \to \cale'$ of $\sco_X$-modules induces $\sco_{X,p}$-linear morphisms

\begin{equation}\notag
\eta_p: \cale_p \to \cale_p'
\end{equation}

on stalks, so too does $\eta$ induce $\kappa(p)$-linear morphisms on fibers by tensoring:

\begin{equation}\notag
\eta^{\text{f}}\_p \defeq \eta_p \otimes \kappa(p) : E_p = \cale_p \otimes_{\sco_{X,p}} \kappa(p) \to \cale_p' \otimes_{\sco_{X,p}} \kappa(p)  = E'_p.
\end{equation}

If $\eta$ is an isomorphism of $\sco_X$-modules, prove:

1. Each map on stalks $\eta_p$ is an $\sco_{X,p}$-linear isomorphism.

2. Each map on fibers $\eta^{\text{f}}\_p$ is a $\kappa(p)$-linear isomorphism.

*Note*: In this post, the fiber maps $\eta_p^{\text{f}}$ will be much more important than the stalk maps $\eta_p$, and hence the former should have the simpler notation. Therefore, I will often write $\eta_p$ for when I really mean $\eta_p^{\text{f}}$, and you should rely on context to determine which map I intend.
</div>
</section>















{% assign sec_num = sec_num | plus: 1 %}
{% assign sec_idx = sec_idx | plus: 1 %}
<section data-sec-title="{{ post_num }}.{{ sec_num }}. {{ page.sections[sec_idx] }}">
## {{ post_num }}.{{ sec_num }}. {{ page.sections[sec_idx] }}

The definition of *freeness* for regular modules adapts easily to the case of sheaves of modules. But for the latter there is also a notion of *local freeness*.

<div class="highlight-box" id="free-mod">
**Definition.** Let $\cale$ be an $\sco_X$-module over a locally ringed space $X$.

* We shall say $\cale$ is *free of rank $k$* if it is isomorphic in $\Mod_X$ to a direct sum of the form $\sco_X^k$.

* We shall say $\cale$ is *locally free of rank $k$* if $X$ has an open cover $\\{W_i\\}\_{i\in I}$ such that $\cale\|\_{W_i}$ is free of rank $k$ in $\Mod\_{W_i}$. In other words, we require that for each $i\in I$ there exists an $\sco_{W_i}$-linear isomorphism
    \begin{equation}\label{table-eqn}
    \Phi_i: \sco_{W_i}^k \to \cale\|\_{W_i}
    \end{equation}
where $\sco_{W_i} = \sco_X\|\_{W_i}$. In this case:
    * The open over $\\{W_i\\}\_{i\in I}$ is called a *trivializing open cover* of the module.
    
    * The module is said to *trivialize* over $W_i$.
    
    * The isomorphisms \eqref{table-eqn} are called *(local) trivializations*.

* We define $\lfMod_X$ to be the full subcategory of $\Mod_X$ whose objects are the locally free $\sco_X$-modules (of any rank).
</div>

Transitioning from one trivializing open set $W_i$ to another $W_j$ is facilitated via the important functions defined in:

<div class="highlight-box">
**Definition.** Let $\cale$ be a locally free $\sco_X$-module of rank $k$ over a locally ringed space $X$, and let $\\{W_i\\}\_{i\in I}$ be a trivializing open cover with trivializations $\\{\Phi_i\\}_{i\in I}$. Let $i$ and $j$ be indices in $I$ with $W_i \cap W_j \neq \emptyset$.

* The $\sco_{W_i\cap W_j}$-linear automorphism
    \begin{equation}\notag
    \tau_{ji}: \sco_{W_i \cap W_j}^k \xrightarrow{\Phi_i} \cale\|\_{W_i\cap W_j} \xrightarrow{\Phi_j^{-1}} \sco_{W_i \cap W_j}^k
    \end{equation}
is called a *transition function.*

* For each $p\in W_i \cap W_j$, we consider the fiber map
    \begin{equation}\notag
    T_{ji}(p) : \bbr^k \xrightarrow{\ev_{\sco_X^k,p}^{-1}} \kappa(p)^k \xrightarrow{(\tau_{ji})\_p} \kappa(p)^k \xrightarrow{\ev_{\sco_X^k,p}} \bbr^k, \quad v\mapsto T_{ji}(p)v,
    \end{equation}
where $\ev_{\sco_X^k,p}$ is the evaluation map defined <a href="#mod-eval" style="color: #f5f5f5; font-family: 'Lora', serif; font-size: 1em; text-decoration: underline;">above</a>. The smooth map
    \begin{equation}\notag
    T_{ji}: W_i \cap W_j \to \GL(k) \defeq \GL(k,\bbr), \quad p\mapsto T_{ji}(p)
    \end{equation}
is called a *fiber transition function*.

* The collection $\\{W_{i},T_{ji}\\}_{i,j\in I}$ is called a *$\GL(k)$-cocycle*.
</div>

The significance of the prefix "$\GL(k)$-" in $\GL(k)$-cocycle will be significant later when we talk about reduction of structure groups.


<div class="highlight-box" id="loc-free-mod">
**Theorem (Fiber criterion for isomorphism---locally free modules).** Let $\eta: \cale \to \cale'$ be an $\sco_X$-linear morphism between two locally free $\sco_X$-modules over a locally ringed space $X$. Then $\eta$ is an isomorphism if and only if each fiber map $\eta_p: E_p \to E_p'$ is a linear isomorphism.
</div>

I will leave it to you to show that if $\eta$ is an isomorphism, then so are each of the fiber maps $\eta_p$. For the converse, we will use the well-known criterion that $\eta$ is an isomorphism if and only if each induced map $\cale_p \to \cale_p'$ on stalks is an isomorphism. This actually *does* not require local freeness, and a proof may be found in virtually any textbook that treats sheaves at an intermediate level; for example, Tennison's book cited in the <a href="#references">References</a> contains a proof in Theorem 4.10. But, by local freeness, the stalks $\cale_p$ and $\cale_p'$ are free modules over the local ring $\sco_{X,p}$ of finite rank. Therefore, to prove the theorem, it will suffice to establish the following:

<div class="highlight-box2">
**An algebraic fact.** Let $A$ be a commutative local ring with maximal ideal $\mfm$ and residue field $k=A/\mfm$, and let $\alpha: A^m \to A^n$ be an $A$-linear map. Then $\alpha$ is an isomorphism if and only if the induced map

\begin{equation}\notag
\alpha \otimes_A k : k^m \to k^n
\end{equation}

is a $k$-linear isomorphism.
</div>

Again, it is clear that $\alpha$ being an isomorphism implies $\alpha \otimes_A k$ is one too. Conversely, if $\alpha \otimes_A k$ is an isomorphism, then its determinant is nonzero in the residue field $k$. Thus, the determinant of $\alpha$ is not in the maximal ideal $\mfm$, which means that it must be a unit. Hence, $\alpha$ is an isomorphism. This completes the proof of the theorem. Q.E.D.
</section>




































{% assign sec_num = sec_num | plus: 1 %}
{% assign sec_idx = sec_idx | plus: 1 %}
<section data-sec-title="{{ post_num }}.{{ sec_num }}. {{ page.sections[sec_idx] }}">
## {{ post_num }}.{{ sec_num }}. {{ page.sections[sec_idx] }}

Having defined the first main actor in this story, we now move on to the second.

<div class="highlight-box">
**Definition.** Let $\pi:E \to X$ be a surjective morphism between two locally ringed spaces and for each $p\in X$, define $E_p = \pi^{-1}(p)$, called the *fiber* over $p$.

* We shall say $\pi$ is a *vector bundle of rank $k$ (over $X$)* if each fiber $E_p$ is an $\bbr$-vector space of dimension $k$. The space $E$ is called the *total space* of the vector bundle, while $X$ is called the *base space*.

* If $\pi':E'\to X$ is a second vector bundle (of any rank) over $X$, then a *morphism* from $\pi$ to $\pi'$ is a morphism $\phi: E\to E'$ on total spaces such that:

    1. We have $\pi = \pi' \circ \phi$.

    2. For each $p\in X$, the induced map on fibers
        \begin{equation}\notag
        \phi_p : E_p \to E'_p, \quad v \mapsto \phi(v),
        \end{equation}
    which is well-defined according to (1.), is an $\bbr$-linear map.

* The *composition* of two morphisms of vector bundles is just the composition of the associated maps on total spaces, and the *identity morphisms* are the identity morphisms on total spaces. With vector bundles (of any rank) as objects and these morphisms, we obtain the category $\Vect_X$ of vector bundles over $X$.
</div>

In many references, the term *vector bundle* usually stands for *locally trivial vector bundle* (over a manifold), which we will define below. Also, though technically a vector bundle is a *morphism* $\pi:E \to X$, we shall often refer to the total space $E$ as if it were the vector bundle.

We now have two usages of the single symbol $E_p$ and the word *fiber*. It could represent the fiber

\begin{equation}\notag
E_p = \cale_p \otimes_{\sco_{X,p}} \kappa(p)
\end{equation}

of a sheaf of modules $\cale$ over $X$, or it could be the fiber

\begin{equation}\notag
E_p = \pi^{-1}(p)
\end{equation}

of a vector bundle $\pi:E \to X$. These two usages will be reconciled later, but for now, just be aware that you need to keep track of context in order to determine what I mean by *fiber* and the symbol $E_p$.

If $\pi:E \to X$ is a vector bundle, then the total space is clearly the disjoint union of the fibers:

\begin{equation}\label{disjoint-eqn}
E = \bigsqcup_{p\in X} E_p.
\end{equation}

Here, by writing the disjoint union, I do not mean the "external disjoint union" in which every element in $\bigsqcup_{p\in X} E_p$ is an ordered pair $(p,v)$ with $v\in E_p$; rather, I mean the "internal disjoint union," which simply means $E = \bigcup_{p\in X} E_p$ and that the fibers are pairwise disjoint. Also, take care to notice that the decomposition \eqref{disjoint-eqn} is one of *sets*, and not necessarily one of topological spaces; that is, the topology on the total space $E$ is *not* required to be the disjoint union topology. From this point of view, a morphism $\phi:E\to E'$ of vector bundles over $X$ decomposes as a disjoint union of maps on fibers:

\begin{equation}\label{union-map}
\phi = \bigsqcup_{p\in X} \phi_p : \bigsqcup_{p\in X} E_p \to \bigsqcup_{p\in X} E_p', \quad \text{where $\phi_p: E_p \to E_p'$ is $\bbr$-linear}.
\end{equation}

It's another matter to go in the other direction, however. If one *begins* with a collection of $\bbr$-linear maps $\phi_p$ and forms the union \eqref{union-map}, then it is not guaranteed (in general) that one obtains a morphism of vector bundles.

Sometimes it is useful to compare vector bundles over different base spaces. To make sense of this, let $\alpha: X \to X'$ be a morphism of locally ringed spaces, and suppose $\pi:E \to X$ is a vector bundle over $X$ while $\pi': E' \to X'$ is a vector bundle over $X'$. Then a *morphism from $\pi$ to $\pi'$ over $\alpha$* is a morphism $\phi: E\to E'$ on total spaces such that:

1. We have $\pi' \circ \phi = \alpha \circ \pi$.

2. For each $p\in X$, the induced map on fibers
    \begin{equation}\notag
    \phi_p: E_p \to E'_{\alpha(p)}, \quad v\mapsto \phi(v),
    \end{equation}
which is well-defined according to (1.), is an $\bbr$-linear map.

Notice then that the definition of a *morphism* as given in the box above is subsumed into this more general definition of *morphisms of vector bundles over morphisms of locally ringed spaces*. Indeed, a morphism of the first type is simply a morphism of second type over an identity map.

This second type of morphism fits in nicely with the next important definition, as you will see in the easy exercise immediately following:

<div class="highlight-box">
**Definition.** Let $\pi: E \to X$ be a vector bundle and $W\subseteq X$ a nonempty open subset. Define $E\|\_W = \pi^{-1}(W)$ and let

\begin{equation}\notag
\pi\|\_W : E\|\_W \to W
\end{equation}

be the restriction of $\pi$ to $E\|\_W$. Then $\pi\|\_W$ is a vector bundle over $W$ called the *restriction* of $\pi$ to $W$.
</div>

<div class="highlight-box2">
**Exercise.**

1. Check that $\pi\|\_W$ really is a vector bundle over $W$ of the same rank as $\pi$. Is it a union of fibers, each of which is an $\bbr$-vector space?

2. Prove that the inclusion map $E\|\_W \to E$ is a morphism of vector bundles over the inclusion $W\to X$ of base spaces.
</div>

The next important definition is the first step in associating to every vector bundle a sheaf of modules.

<div class="highlight-box">
**Definition.** Let $\pi:E \to X$ be a vector bundle and $V\subseteq X$ a nonempty open set. A *local section of $\pi$ over $V$* is a morphism $s:V\to E$ for which $p = (\pi\circ s)(p)$ for all $p\in V$. We let $\Gamma(V,E)$ denote the set of all local sections over $V$. If $V\supseteq W$ is an inclusion of nonempty open sets, we define the *restriction* map

\begin{equation}\notag
r^V_W : \Gamma(V,E) \to \Gamma(W,E), \quad s \mapsto s\|\_W.
\end{equation}
</div>

<div class="highlight-box2">
**Exercise.** Suppose given two sections $s,t\in \Gamma(V,E)$ and a function $f\in \sco_X(V)$. Define the *sum* of $s$ and $t$, denoted $s+t$, to be the local section with

\begin{equation}\notag
(s+t)(p) = s(p) +t(p), \quad \forall p\in V.
\end{equation}

Notice that the sum on the right-hand side is the addition operation in the fiber $E_p$. Define the *product* of $f$ and $s$, denoted $fs$, to be the local section with

\begin{equation}\notag
(fs)(p) = f(p)s(p), \quad \forall p\in V.
\end{equation}

Notice that the product on the right-hand side is the $\bbr$-scaling operation in the fiber $E_p$.

With these pointwise operations and the restriction maps defined above, prove that the assignment $V\mapsto \Gamma(V,E)$ is an $\sco_X$-module, called the *module of sections* of $E$. (This requires us to set $\Gamma(\emptyset,E) = 0$, the trivial module.)
</div>

Remember that in passing from a sheaf of modules $\cale$ to its associated fibers, we simply changed the typeface from $\cale$ to $E_p$. We will often do the same for vector bundles: If $E$ is a vector bundle, then the module of sections $\Gamma(V,E)$ will be denoted $\cale(V)$, and we will refer to the $\sco_X$-module $V\mapsto \Gamma(V,E)$ by $\cale$.

For an $\sco_X$-module $\cale$ with fibers $E_p$, we <a href="#mod-eval">already have</a> several important evaluation maps. We now define analogs of these for vector bundles:

<div class="highlight-box" id="vb-eval">
**Definition.** Let $E$ be a vector bundle over a locally ringed space $X$ with module of sections $\cale$.

* For all nonempty open sets $U$ in $X$, define the *evaluation map over $U$* to be the function
    \begin{equation}\notag
    \ev_{E,U}: U \times \cale(U) \to E\|\_U, \quad (p,s) \mapsto s(p).
    \end{equation}

* Given a point $p\in X$, define the *evaluation map at $p$* to be the function
    \begin{equation}\label{fiber-eval-eqn}
    \ev_{E,p}: \cale_p \otimes_{\sco_{X,p}} \kappa(p) \to E_p, \quad s \mapsto s(p).
    \end{equation}
</div>

<div class="highlight-box2" id="vb-eval-ex">
**Exercise.** Prove that the evaluation map \eqref{fiber-eval-eqn} is well-defined by showing first that there is a natural well-defined evaluation map at the stalk level:
    \begin{equation}\notag
    \cale_p \to E_p, \quad s\mapsto s(p).
    \end{equation}
Show that this map kills the submodule $\mfm_p\cale_p$, and hence induces the map \eqref{fiber-eval-eqn}.
</div>

The evaluation maps \eqref{fiber-eval-eqn} will later be upgraded to isomorphisms for certain types of vector bundles (over manifolds). Thus, for these vector bundles, the vector bundle fibers $E_p$ and the fibers $\cale_p \otimes_{\sco_{X,p}} \kappa(p)$ of the modules of sections are the same thing, at least up to isomorphism.

Not only do we have a way to associate a sheaf of modules to every vector bundle, but this association is actually *functorial*:

<div class="highlight-box">
**Definition.** Let $\pi:E \to X$ and $\pi':E' \to X$ be two vector bundles over $X$ with modules of sections $\cale$ and $\cale'$. Given a morphism $\phi:E \to E'$ of vector bundles and an open set $V\subseteq X$, define

\begin{equation}\notag
\varphi_V : \cale(V) \to \cale'(V)
\end{equation}

by setting

\begin{equation}\notag
\varphi_V(s) = \phi \circ s, \quad \forall s\in \cale(V).
\end{equation}
</div>

<div class="highlight-box2" id="func">
**Exercise.**

1. Prove that the map $\varphi_V$ is $\sco_X(V)$-linear and commutes with the restriction maps of the module of sections.

2. Conclude that the $\varphi_V$'s assemble together over all open sets $V$ to yield an $\sco_X$-linear morphism that we denote by $\varphi$.

3. Prove that the assignment $\phi \mapsto \varphi$ preserves compositions of morphisms of vector bundles and identity morphisms.

4. Conclude that the assignments $E \mapsto \cale$ and $\phi \mapsto \varphi$ together yield a functor
    \begin{equation}\notag
    S: \Vect_X \to \Mod_X.
    \end{equation}
</div>

Provided that $X$ is a manifold, we will see later that the functor $S$ is one half of an equivalence between certain full subcategories of $\Vect_X$ and $\Mod_X$.
</section>










{% assign sec_num = sec_num | plus: 1 %}
{% assign sec_idx = sec_idx | plus: 1 %}
<section data-sec-title="{{ post_num }}.{{ sec_num }}. {{ page.sections[sec_idx] }}">
## {{ post_num }}.{{ sec_num }}. {{ page.sections[sec_idx] }}

Vector bundles in the previous section were defined over arbitrary locally ringed spaces. However, in order to define the analog for vector bundles of the *locally free* condition on sheaves of modules, we must specialize to manifolds.

<div class="highlight-box">
**Definition.** Let $\pi:E \to M$ be a vector bundle of rank $k$ over a manifold $M$.

* We shall say $\pi$ is a *trivial vector bundle of rank $k$* if there is an isomorphism of vector bundles
    \begin{equation}\notag
    \phi:M \times \bbr^k \to E
    \end{equation}
where $M\times \bbr^k$ is the total space of the vector bundle $\pi_1: M \times \bbr^k \to M$ given by projection onto the first cartesian factor.

* We shall say $\pi$ is a *locally trivial vector bundle of rank $k$* if $M$ has an open cover $\\{W_i\\}\_{i\in I}$ such that $E\|\_{W_i}$ is trivial of rank $k$ in $\VB{W_i}$. In other words, we require that for each $i\in I$ there exists an isomorphism
    \begin{equation}\label{table2-eqn}
    \phi_i:W_i\times \bbr^k \to E\|\_{W_i}
    \end{equation}
of vector bundles. In this case:

    * The open cover $\\{W_i\\}_{i\in I}$ is called a *trivializing open cover* of the vector bundle.
    
    * The vector bundle is said to *trivialize* over $W_i$.
    
    * The isomorphisms \eqref{table2-eqn} are called *(local) trivializations*.

* We define $\ltVect_M$ to be the full subcategory of $\Vect_{M}$ whose objects are the locally trivial vector bundles (of any rank).
</div>

I wrote this definition in a way that is *exactly* parallel to the <a href="#free-mod">definition</a> of locally free sheaves of modules. Scroll back and forth between the definitions and compare them!

<div class="highlight-box">
**Definition.** Let $E$ be a locally trivial vector bundle of rank $k$ over a manifold $M$, and let $\\{W_i\\}_{i\in I}$ be a trivializing open cover with trivializations $\\{\phi_i\\}$. Let $i$ and $j$ be indices in $I$ with $W_i\cap W_j \neq \emptyset$. 

* The isomorphism
    \begin{equation}\notag
    \tau_{ji}: (W_i \cap W_j) \times \bbr^k \xrightarrow{\phi_i} E\|\_{W_i\cap W_j} \xrightarrow{\phi_j^{-1}} (W_i \cap W_j) \times \bbr^k
    \end{equation}
of vector bundles over $W_i\cap W_j$ is called a *transition function*.

* For each $p\in W_i\cap W_j$, we consider the fiber map
    \begin{equation}\notag
    T_{ji}(p) \defeq (\tau_{ji})\_p : \bbr^k \to \bbr^k.
    \end{equation}
The smooth map
    \begin{equation}\notag
    T_{ji}: W_i \cap W_j \to \GL(k), \quad p \mapsto T_{ji}(p)
    \end{equation}
is called a *fiber transition function*.

* The collection $\\{W_{i},T_{ji}\\}_{i,j\in I}$ is called a *$\GL(k)$-cocycle*.
</div>

We now have transition functions and $\GL(k)$-cocyles for both locally free modules and locally trivial vector bundles. As we will see later, under the correspondence between such sheaves and vector bundles---which is the main objective of this post---these transitions functions and cocycles will coincide exactly.

I now want to explain the significance of the "$\GL(k)$-" prefix in $\GL(k)$-cocycle.

<div class="highlight-box">
**Definition.** Let $E$ be a locally trivial vector bundle over a manifold $M$, let $\\{W_i,T_{ji}\\}\_{i,j\in I}$ be a $\GL(k)$-cocycle, and suppose $G$ is a subgroup of $\GL(k)$.

* If the images of all the fiber transition functions $T_{ji}$ are contained in the subgroup $G$, then $\\{W_i,T_{ji}\\}$ is called a *$G$-cocycle* and $G$ is called the *structure group* of the cocycle.

* If such a $G$-cocycle exists, then we shall say *the structure group of the vector bundle may be reduced to $G$*, and the $G$-cocycle $\\{W_i,T_{ji}\\}$ is also called a *$G$-reduction*.
</div>

Though technically a *structure group* is associated with a cocycle, when it will cause no confusion we shall often refer to a *structure group* of the vector bundle, leaving the representative cocycle implicit.

<a href="#loc-free-mod">We have</a> a fiber criterion for isomorphisms between locally free modules. Here's the analog for locally trivial vector bundles:

<div class="highlight-box" id="loc-free-vb">
**Theorem (Fiber criterion for isomorphism---locally trivial vector bundles).** Let $\psi: E \to E'$ be a morphism between two locally trivial vector bundles over a manifold $M$. Then $\psi$ is an isomorphism if and only if each fiber map $\psi_p: E_p \to E_p'$ is a linear isomorphism.
</div>

I will let you prove that if $\psi$ is an isomorphism, then so too are each of the fiber maps $\psi_p$. Conversely, if each of the fiber maps $\psi_p$ are isomorphisms, then the inverse function

\begin{equation}\notag
\psi^{-1} = \bigsqcup_{p\in M} \psi^{-1}_p : E' \to E
\end{equation}

exists as a set-theoretic function. We need to prove that it is smooth.

But smoothness is a local condition, so we can check smoothness of $\psi^{-1}$ on an open cover of its domain. In particular, let $W$ be an open subset of $M$ over which both $E$ and $E'$ trivialize, with trivializations

\begin{equation}\notag
\phi: W\times \bbr^k \to E\|\_W \quad \text{and} \quad \phi': W\times \bbr^k \to E'\|\_W.
\end{equation}

We then have a commutative diagram

\begin{equation}\notag
\begin{xy}
\xymatrix{
 E\|_W \ar[r]^{\psi} &  E'\|\_W \\\  W \times \bbr^k \ar[u]^{ \phi} \ar[r]\_{\color{\white}\tl{\psi}} &  W \times \bbr^k \ar[u]\_{\phi'} }
\end{xy}
\end{equation}

where $\tl{\psi}$ is a bijective smooth map of the form

\begin{equation}\notag
(p,v) \mapsto (p,S(p)v)
\end{equation}

for some function $S: W \to \GL(k)$. If we can prove that $S$ is smooth, then we'll be done, for then the inverse 

\begin{equation}\notag
\tl{\psi}^{-1} : (p,v) \mapsto (p,S(p)^{-1}v)
\end{equation}

is smooth since $S$ is smooth and so is inversion. But then $\psi^{-1} = \phi \circ \tl{\psi}^{-1} \circ (\phi')^{-1}$, so $\psi^{-1}$ is indeed smooth.

To prove that $S$ is smooth, let $e_1,\ldots,e_k$ be the standard ordered basis of $\bbr^k$. Identifying operators in $\GL(k)$ with their standard matrices with respect to the $e_j$'s, we see that the $j$-th column of $S(p)$ is the vector $S(p)e_j$. But each of the the functions

\begin{equation}\notag
W \to \bbr^k , \quad p \mapsto S(p)e_j, \quad j=1,\ldots,k,
\end{equation}

are smooth, and hence each entry in the columns of $S(p)$ are smooth functions of $p$. Hence $S$ is smooth. Q.E.D.
</section>












{% assign sec_num = sec_num | plus: 1 %}
{% assign sec_idx = sec_idx | plus: 1 %}
<section data-sec-title="{{ post_num }}.{{ sec_num }}. {{ page.sections[sec_idx] }}">
## {{ post_num }}.{{ sec_num }}. {{ page.sections[sec_idx] }}

Reductions of structure groups of tangent bundles are of particular interest as they often correspond to familiar geometric structures on manifolds. We study these in more detail in this section, and then offer a class of very important examples of reductions that occur in physics.

First, let's recall that the tangent bundle $T(M)$ over an $n$-dimensional manifold trivializes over open parametrizable subsets of the base space $M$. Indeed, suppose $\\{W_i\\}$ is an open cover of $M$ consisting of open parametrizable subsets, with diffeomorphisms

\begin{equation}\notag
\psi_i: U_i \to W_i,
\end{equation}

where each $U_i$ is an open subset of $\bbr^n$. Then the topology and smooth structure on $T(M)$ are the *unique* ones such that the global pushforwards

\begin{equation}\notag
(\psi_i)\_\ast : U_i \times \bbr^n \to T(M)\|\_{W_i}, \quad (t,v) \mapsto \left(\psi_i(t),(\psi_i)_{\ast,t}(v)\right),
\end{equation}

are diffeomorphisms. The diffeomorphisms $\psi_i$ lift to isomorphisms of trivial vector bundles

\begin{equation}\notag
\psi_i \times \id: U_i \times \bbr^k \to W_i \times \bbr^n, \quad (t,v)\mapsto \left( \psi_i(t),v\right),
\end{equation}

over $\psi_i$, and then the trivialization

\begin{equation}\notag
\phi_i: W_i \times \bbr^n \to T(M)\|\_{W_i}
\end{equation}

is defined to be the composite

\begin{equation}\notag
\phi_i = (\psi_i)\_\ast \circ (\psi\_i \times \id)^{-1} = (\psi_i)\_\ast \circ (\psi\_i^{-1} \times \id).
\end{equation}

Putting everything together, we see that the fiber transition function

\begin{equation}\notag
J_{ji} : W_i \cap W_j \to \GL(n)
\end{equation}

is given by

\begin{equation}\label{jacob-eqn}
J_{ji}(p) = (\psi_j^{-1} \circ \psi_i)_{\ast,t}, \quad p = \psi_i(t).
\end{equation}

Now, the $\GL(n)$-cocycle $\\{W_i,J_{ji}\\}$ constructed in this way is a very special type of cocycle belonging to the tangent bundle $T(M)$; there may be other cocycles that do *not* manifest in this form. These special cocycles are given their own name in the first part of:

<div class="highlight-box">
**Definition.** Let the notation be as above.

* The $\GL(n)$-cocycle $\\{W_i, J_{ji}\\}\_{i,j\in I}$, with $J_{ji}$ defined as \eqref{jacob-eqn}, is called a *jacobian cocycle* of $T(M)$.

* A $G$-reduction of the structure group of $T(M)$ is called an *infinitesimal $G$-structure* on $M$.

* If $T(M)$ has a $G$-reduction which is also a jacobian cocycle, then the $G$-reduction is said to be *integrable*.
</div>

To help fix these ideas and concepts in our minds, let's go through an example which is central to relativity theory. Let $n,k\geq 0$ be integers, not both zero, and consider the *indefinite orthogonal group of signature $(n,k)$*, denoted $\O(n,k)$, defined to be the subgroup of linear operators in $\GL(n+k)$ that preserve the scalar product

<div class="highlight-box2">
\begin{equation}\label{who-eqn}
\ang{v,w} \defeq v^1w^1 + \cdots + v^n w^n - v^{n+1}w^{n+1} - \cdots - v^{n+k}w^{n+k}, \quad v,w\in \bbr^{n+k}.
\end{equation}
</div>

In particular, the class of indefinite orthogonal groups contains the regular orthogonal groups since $\O(n,0) = \O(n)$ for each $n\geq 1$.

Let $e_1,\ldots,e_{n+k}$ denote the standard ordered basis of $\bbr^{n+k}$. If we define $\eta \in \GL(n+k)$ by

\begin{equation}\notag
\eta(e_j) = \begin{cases} e_j & : 1\leq j \leq n, \\\ -e_j & : n < j \leq n+k, \end{cases}
\end{equation}

then one easily sees that $\Lambda \in \O(n,k)$ if and only if 

\begin{equation}\label{yup-eqn}
\Lambda^t \eta \Lambda = \eta,
\end{equation}

where $(-)^t$ denotes the transpose operation. Thus, $\O(n,k)$ is a real <a href="https://en.wikipedia.org/wiki/Linear_algebraic_group#">linear algebraic group</a> and is, in particular, a Lie subgroup of $\GL(n+k)$ (since it is closed in the latter). If $k=0$, then $\eta$ is the identity operator and \eqref{yup-eqn} reduces to the fact that $\Lambda^{-1} = \Lambda^t$.

<div class="highlight-box">
**Definition.**

* A *pseudo-riemannian manifold of signature $(n,k)$* is an $(n+k)$-dimensional manifold equipped with an infinitesimal $\O(n,k)$-structure.

* A pseudo-riemannian manifold of signature $(n,0)$ is called a *riemannian manifold*.

* A pseudo-riemannian manifold of signature $(1,n-1)$ is called a *lorentzian manifold*.
</div>

The lorentzian manifolds of signature $(1,3)$ provide the mathematical models of spacetimes in relativity theory.

Now, it turns out that an infinitesimal $\O(n,k)$-structure on a manifold $M$ is exactly what is needed in order to transport the scalar product \eqref{who-eqn} to the tangent spaces of $M$ in a coherent fashion. Indeed, suppose that $\\{W_i,T_{ji}\\}_{i,j\in I}$ is an $\O(n,k)$-cocycle on $T(M)$ with trivializations

\begin{equation}\notag
\phi_i: W_i \times \bbr^{n+k} \to T(M)\|\_{W_i},
\end{equation}

and for each $p\in M$ choose an $i\in I$ such that $p\in W_i$. Then, define

<div class="highlight-box2">
\begin{equation}\label{who1-eqn}
\ang{v,w}_p = \ang{\tl{v}_i,\tl{w}_i}
\end{equation}
</div>

where $\phi_i(p,\tl{v}\_i) = v$ and $\phi_i(p,\tl{w}\_i)= w$, and where the right-hand side of \eqref{who1-eqn} is the scalar product \eqref{who-eqn}. As you may then easily check, this definition of $\ang{v,w}\_p$ does *not* depend on the particular choice of $W_i$ since the fiber transition functions $T_{ji}$ have their images in $\O(n,k)$.

Furthermore, the scalar product \eqref{who1-eqn} smoothly depends on $p$, in the following sense:

<div class="highlight-box2">
For every open parametrizable subset $U$ of $M$, each of the functions

\begin{equation}\label{smooth-eqn}
g_{\mu\nu}:U \to \bbr, \quad p \mapsto \ang{\bd_\mu\|\_p,\bd_\nu\|\_p}_p,
\end{equation}

is smooth, where $\\{\bd_\mu\|\_p\\}$ is the coordinate basis of the tangent space $T_p(M)$.
</div>

To see this, let

\begin{equation}\notag
\theta: U \times \bbr^{n+k} \to T(M)\|\_U
\end{equation}

be the associated local trivialization of the tangent bundle. Then

\begin{equation}\notag
\bd_\mu\|\_p = (\theta \circ s_\mu)(p)
\end{equation}

where $s_\mu: U \to U \times \bbr^{n+k}$ is the smooth map with $s_\mu(p)=(p,e_\mu)$ and where $e_\mu$ is the $\mu$-th standard basis vector of $\bbr^{n+k}$. To prove $g_{\mu\nu}$ is smooth, it will suffice to prove that the restriction

\begin{equation}\notag
g_{\mu\nu} : U \cap W_i \to \bbr
\end{equation}

is smooth, for each $i\in I$ such that $U\cap W_i \neq \emptyset$. But for each $p\in U\cap W_i$ we have

\begin{equation}\label{light-eqn}
g_{\mu\nu}(p) =  \ang{(\pi\_2 \circ \phi\_i^{-1} \circ \theta \circ s\_\mu)(p),(\pi\_2 \circ \phi\_i^{-1}\circ \theta \circ s\_\nu)(p)},
\end{equation}

where $\pi_2: (U\cap W_i) \times \bbr^{n+k} \to \bbr^{n+k}$ is the natural projection onto the second cartesian factor. But the right-hand side of \eqref{light-eqn} clearly smoothly depends on $p$, and hence so does the left-hand side.

<div class="highlight-box">
**Definition.** Let $M$ be a pseudo-riemannian manifold of signature $(n,k)$.

* The scalar products $\ang{-,-}_p$ defined above in \eqref{who1-eqn} are collectively called the *metric tensor* on $M$.

* The manifold $M$ is called *flat* if its infinitesimal $\O(n,k)$-structure is integrable.

* If $M$ is not flat, it is called *curved*.
</div>

The difference between flat and curved lorentzian manifolds is a central topic in the general theory of relativity. We will have to wait till a future post for a closer study of these gadgets.

The definition given above of the metric tensor is perhaps not the most mathematically elegant one, though it is the one that you use if you want to actually compute something. Later, we will see that the metric tensor is equivalently described by a certain type of $\sco_M$-linear morphism

\begin{equation}\notag
g: \calx_M \otimes_{\sco_M} \calx_M \to \sco_M
\end{equation}

where $\calx_M$ is the sheaf of vector bundles on $M$, i.e., the sheaf of sections of the tangent bundle $T(M)$. But notice that we are (apparently) tensoring $\calx_M$ against itself over the structure sheaf $\sco_M$; this tensor operation---which is a bit tricky to define---will be described in the next post of this series.
</section>












{% assign sec_num = sec_num | plus: 1 %}
{% assign sec_idx = sec_idx | plus: 1 %}
<section data-sec-title="{{ post_num }}.{{ sec_num }}. {{ page.sections[sec_idx] }}">
## {{ post_num }}.{{ sec_num }}. {{ page.sections[sec_idx] }}

Let's return to the general theory. We have the functor

\begin{equation}\notag
S: \Vect_M \to \Mod_M
\end{equation}

which sends every vector bundle $\pi:E \to M$ over a manifold $M$ to its module of sections $\cale$; see the <a href="#func">exercise</a> above. My goal in this section is to prove that the image of the restricted functor

\begin{equation}\notag
S: \ltVect_M \to \Mod_M
\end{equation}

actually lands in the full subcategory $\lfMod_M$ of locally free modules. Here's the theorem:

<div class="highlight-box" id="vb-to-mod">
**Theorem (Vector bundles $\Rightarrow$ locally free sheaves).** Let $\pi:E\to M$ be a locally trivial vector bundle of rank $k$ over a manifold $M$ with module of sections $\cale$. Then $\cale$ is locally free of rank $k$. In particular:

* If $E$ is trivializes over an open subset $W$ of $M$ with trivialization
    \begin{equation}\label{third-eqn}
    \phi: W \times \bbr^k \to E\|\_W,
    \end{equation}
then $\cale$ trivializes over $W$ with an $\sco_W$-linear trivialization
    \begin{equation}\label{fourth-eqn}
    \Phi: \sco_W^k \to \cale\|\_W
    \end{equation}
whose fiber maps are the same as those of $\phi$, up to "evaluation at $p$." Precisely, for each $p\in W$, the diagram
    \begin{equation}\notag
    \begin{xy}
    \xymatrix{
     \kappa(p)^k \ar[r]^-{ \Phi_p} \ar[d]\_{\ev_{\sco_M^k,p}} &  \cale_p \otimes \kappa(p) \ar[d]^{\ev_{E,p}} \\\  \bbr^k \ar[r]\_-{ \phi_p} &  E_p}
    \end{xy}
    \end{equation}
commutes, where the vertical maps are the evaluation maps defined <a href="#mod-eval" style="color: #f5f5f5; font-family: 'Lora', serif; font-size: 1em; text-decoration: underline;">here</a> and <a href="#vb-eval" style="color: #f5f5f5; font-family: 'Lora', serif; font-size: 1em; text-decoration: underline;">here</a>.

* For each nonempty open set $V\subseteq W$, the trivializations \eqref{third-eqn} and \eqref{fourth-eqn} are the same up to "evaluation over $V$." Precisely, they fit into the commutative diagram
    \begin{equation}\label{yeah-boy-eqn}
    \begin{xy}
    \xymatrix{
     V \times \sco_M(V)^k \ar[r]^-{ \id \times \Phi\_V} \ar[d]\_{ \ev_{\sco_M^k,V}} &  V \times \cale(V) \ar[d]^{ \ev_{E,V}} \\\  V \times \bbr^k \ar[r]\_-{ \phi} &  E\|\_V}
    \end{xy}
    \end{equation}
where the vertical maps are the evaluation maps defined <a href="#mod-eval" style="color: #f5f5f5; font-family: 'Lora', serif; font-size: 1em; text-decoration: underline;">here</a> and <a href="#vb-eval" style="color: #f5f5f5; font-family: 'Lora', serif; font-size: 1em; text-decoration: underline;">here</a>.

* If $\\{W_i,T_{ji}\\}_{i,j\in I}$ is a $\GL(k)$-cocycle of $E$, then it is also a $\GL(k)$-cocycle of $\cale$.
</div>

Given an open subset $V\subseteq W$ and a section $s\in \cale(V)$, suppose we consider the smooth maps

\begin{equation}\notag
f_i: V \xrightarrow{s} E\|\_W \xrightarrow{\phi^{-1}} W \times \bbr^k \xrightarrow{\pi_i} \bbr, \quad i=1,\ldots,k,
\end{equation}

where $\pi_i$ is the natural projection onto the $i$-th cartesian factor of $\bbr^k$. Then, for all $p\in V$, we have

\begin{equation}\notag
s(p) = \phi(p,f_1(p),\ldots,f_k(p)).
\end{equation}

Then, define

\begin{equation}\notag
s = \Phi_V(f_1,\ldots,f_k).
\end{equation}

I will let you check all the remaining details. Q.E.D.

<div class="highlight-box" id="fiber-fiber">
**Theorem.** Let $\pi:E \to M$ be a locally trivial vector bundle over a manifold $M$ with module of sections $\cale$. For each $p\in M$, the evaluation map

\begin{equation}\notag
\ev_{E,p} : \cale_p \otimes_{\sco_{M,p}} \kappa(p) \to E_p
\end{equation}

is a linear isomorphism.
</div>

We recall in the exercise <a href="#vb-eval-ex">above</a> that the evaluation map $\ev_{E,p}$ is induced by the evaluation map $\dev_p:\cale_p \to E_p$ on the stalk whose kernel contains the submodule $\mfm_p \cale_p$. Thus, to prove the theorem, we need to show two things: (1) The kernel of $\dev_p$ is actually *equal* to the submodule $\mfm_p \cale_p$, and (2) the map $\dev_p$ is surjective.

So, we first prove $\ker{\dev_p} \subseteq \mfm_p \cale_p$. Let $s\in \cale_p$ be a section with $s(p)=0$. Choose an open neighborhood $W$ of $p$ over which $E$ trivializes, and by shrinking it if necessary, suppose that $s\in \cale(W)$. Then $\cale$ trivializes over $W$ as well via an $\sco_W$-linear map

\begin{equation}\notag
\Phi: \sco_W^k \to \cale\|\_W
\end{equation}

built from the trivialization

\begin{equation}\notag
\phi: W \times \bbr^k \to E\|\_W
\end{equation}

as described in the previous theorem. The map

\begin{equation}\notag
\Phi_W: \sco_M(W)^k \to \cale(W)
\end{equation}

is an $\sco_M(W)$-linear isomorphism; let $e_1,\ldots,e_k \in \cale(W)$ be the sections corresponding to the standard basis of the direct sum $\sco_M(W)^k$. Thus, we may write

\begin{equation}\label{mat-eqn}
s = f_1 e_1 + \cdots +f_k e_k,
\end{equation}

where $s = \Phi_W(f_1,\ldots,f_k)$. But $\phi_p(f_1(p),\ldots,f_k(p)) = s(p)=0$, and hence

\begin{equation}\notag
f_1(p) = \cdots = f_k(p) = 0
\end{equation}

since the map on fibers $\phi_p:\bbr^k \to E_p$ is a linear isomorphism. Thus, $f_i \in \mfm_p$ for each $i=1,\ldots,k$, which shows $s\in \mfm_p\cale_p$ in view of \eqref{mat-eqn}.

All that remains is to prove that the evaluation map $\dev_p$ is surjective. Choose a vector $v\in E_p$ and a $k$-tuple $(u_1,\ldots,u_k)\in \bbr^k$ such that

\begin{equation}\notag
\phi_p(u_1,\ldots,u_k) = v.
\end{equation}

Choose functions $f_1,\ldots,f_k \in \sco_{M,p}$ such that $f_i(p) = u_i$ for each $i=1,\ldots,k$. We may choose an open neighborhood $V$ of $p$ small enough so that $V\subseteq W$ and $f_i \in \sco_M(V)$ for each $i=1,\ldots,k$. If we define

\begin{equation}\notag
s = \Phi_V(f_1,\ldots,f_k),
\end{equation}

then $\dev_p(s) = s(p) =v$. Q.E.D.
</section>











{% assign sec_num = sec_num | plus: 1 %}
{% assign sec_idx = sec_idx | plus: 1 %}
<section data-sec-title="{{ post_num }}.{{ sec_num }}. {{ page.sections[sec_idx] }}">
## {{ post_num }}.{{ sec_num }}. {{ page.sections[sec_idx] }}

Having described a method to associate a locally free sheaf of modules to every locally trivial vector bundle via the functor

\begin{equation}\notag
S: \ltVect_{M} \to \lfMod_M,
\end{equation}

we now describe a method to go the other direction and associate a locally trivial vector bundle to every locally free module. We will obtain a functor

\begin{equation}\notag
V: \lfMod_M \to \ltVect_{M},
\end{equation}

and together $S$ and $V$ will be mutually inverse equivalences of categories.

So, let $\cale$ be a locally free sheaf of rank $k$ on a manifold $M$ with fibers

\begin{equation}\notag
E_p = \cale_p \otimes_{\sco_{M,p}} \kappa(p).
\end{equation}

The first step in associating a vector bundle to $\cale$ is to define the total space of the vector bundle:

\begin{equation}\notag
E \defeq \bigsqcup_{p\in M} E_p.
\end{equation}

Here, the disjoint union is the "external" one, so that an element in $E$ is a pair $(p,v)$ with $p\in M$ and $v\in E_p$. We then define the natural projection

\begin{equation}\notag
\pi:E \to M, \quad (p,v) \mapsto p,
\end{equation}

and we claim that $\pi$ is a locally trivial vector bundle of rank $k$. The proof this claim will use the Topology and Structure Sheaf Construction Lemmas proved in the <a href="#appendix-construction-lemmas">appendix</a>. In particular, I will use the notation in those lemmas, so you might want to at least glance at them quickly before continuing.

For the topology on the total space $E$, we need to cook up a cover $\\{U_i\\}_{i\in I}$ of $E$ and bijections

\begin{equation}\notag
\phi_i: Y_i \to U_i,
\end{equation}

where each $Y_i$ is a topological space. Here are the definitions:

<div class="highlight-box2">
* **The open sets $\\{U_i\\}$.** We let $\\{W_i\\}\_{i\in I}$ be the collection of *all* open subsets of $M$ over which $\cale$ trivializes, and we let
    \begin{equation}\notag
    \Phi_i : \sco_{W_i}^k \to \cale\|\_{W_i}
    \end{equation}
be the corresponding local trivializations. For each $i\in I$, we then define
    \begin{equation}\notag
    U_i = \pi^{-1}(W_i) =  \bigsqcup_{p\in W_i} E_p.
    \end{equation}

* **The topological spaces $\\{Y_i\\}$.** For each $i\in I$, we set
    \begin{equation}\notag
    Y_i = W_i \times \bbr^k.
    \end{equation}

* **The bijections $\\{\phi_i\\}$.** Each of the maps $\phi_i$ will end up being a vector bundle morphism from $Y_i$ to $U_i$ (over $W_i$), so I may define $\phi_i$ by defining the fiber maps
    \begin{equation}\notag
    (\phi_i)\_p : \bbr^k \to E_p, \quad \forall p\in W_i,
    \end{equation}
and then unioning them together to obtain $\phi_i$:
    \begin{equation}\notag
    \phi_i: Y_i = \bigsqcup_{p\in W_i} \bbr^k \to \bigsqcup_{p \in W_i} E_p = U_i, \quad (p,v) \mapsto (\phi_i)\_p(v).
    \end{equation}
So, for each $i\in I$ and each $p\in W_i$, we define the fiber map as the composite
    \begin{equation}\notag
    (\phi_i)\_p : \bbr^k \xrightarrow{\ev_{\sco_M^k,p}^{-1}} \kappa(p)^k \xrightarrow{(\Phi_i)\_p} E_p.
    \end{equation}
</div>

We now need to check that these data have the four properties stated in the Topology Construction Lemma. The numbering of the properties here is the same as the numbering in that lemma.

<div class="highlight-box2">
* **Property 1.** For each $i,j\in I$, we have
    \begin{equation}\notag
    \phi_i^{-1}(U_i \cap U_j) = (W_i \cap W_j) \times \bbr^k,
    \end{equation}
which is an open subset of $Y_i$.

* **Property 2.** Provided that $U_i \cap U_j \neq \emptyset$, the composite
    \begin{equation}\label{comp-eqn}
    \phi_j^{-1} \circ \phi_i : \phi_i^{-1}(U_i \cap U_j) \to \phi_j^{-1}(U_i \cap U_j)
    \end{equation}
is given by
    \begin{equation}\notag
    (p,v) \mapsto \left( p, T_{ji}(p)v \right),
    \end{equation}
where $T_{ji}$ is a fiber transition function of $\cale$. But then \eqref{comp-eqn} is smooth (in particular, continuous).

* **Property 3.** To see that countably many of the $U_i$'s cover $E$, note that they are in one-to-one correspondence with the sets in the trivializing open cover $\\{W_i\\}$ of the module $\cale$. But $M$ is a manifold, and thus the open cover $\\{W_i\\}$ contains a countable subcover (since second-countable $\Rightarrow$ Lindel&ouml;f). The corresponding $U_i$'s cover $E$. Finally, note that each $Y_i$ is second-countable since it is a product of two manifolds.

* **Property 4.** Let $u$ and $v$ be distinct points in $E$ contained in the fibers $E_p$ and $E_q$, say. If $p=q$, then $u$ and $v$ are contained in a single $U_i$. If $p\neq q$, then since $M$ is Hausdorff, there are disjoint open neighborhoods of $p$ and $q$. By shrinking these neighborhoods if needed, we may suppose that $\cale$ trivializes over them. But then they are equal to two disjoint open sets $W_i$ and $W_j$, and then $u$ and $v$ are contained in $U_i$ and $U_j$, which are disjoint. Finally, note that each $Y_i$ is Hausdorff since it is a product of manifolds.
</div>

We have thus constructed all the data needed to apply the Topology Construction Lemma to the total space $E$ to obtain a topology on it. Actually, we have *also* constructed the data needed to apply the Structure Sheaf Construction Lemma since we proved that the homeomorphisms \eqref{comp-eqn} are smooth, and thus $E$ is equipped with a structure sheaf $\sco_E$ endowing it with the structure of a manifold. We summarize the situation in a theorem:

<div class="highlight-box" id="mod-to-vb">
**Theorem (Locally free sheaves $\Rightarrow$ vector bundles).** Let $\cale$ be a locally free sheaf of rank $k$ on a manifold $M$. Then the map

\begin{equation}\notag
\pi: E \defeq \bigsqcup_{p\in M} E_p \to M, \quad (p,v) \mapsto p,
\end{equation}

is a locally trivial vector bundle of rank $k$. In particular: 

* There is a *unique* topology and structure sheaf $\sco_E$ on $E$ with the following property: If $\cale$ is trivializes over an open subset $W$ of $M$ with trivialization
    \begin{equation}\label{first-eqn}
    \Phi: \sco_W^k \to \cale\|\_W,
    \end{equation}
then $E$ trivializes over $W$ with trivialization
    \begin{equation}\label{second-eqn}
    \phi: W \times \bbr^k \to E\|\_W
    \end{equation}
whose fiber maps are the same as those of $\Phi$, up to "evaluation at $p$." Precisely, for each $p\in W$, the diagram
    \begin{equation}\notag
    \begin{xy}
    \xymatrix{
     \kappa(p)^k \ar[r]^-{ \Phi_p} \ar[d]\_{\ev_{\sco_M^k,p}} &  \cale_p \otimes \kappa(p) \ar[d]^{=} \\\  \bbr^k \ar[r]\_-{ \phi_p} &  E_p}
    \end{xy}
    \end{equation}
commutes, where the vertical map is the evaluation map defined <a href="#mod-eval" style="color: #f5f5f5; font-family: 'Lora', serif; font-size: 1em; text-decoration: underline;">here</a>.

* For each nonempty open set $V\subseteq W$, the trivializations \eqref{first-eqn} and \eqref{second-eqn} are the same up to "evaluation over $V$." Precisely, they fit into the commutative diagram
    \begin{equation}\notag
    \begin{xy}
    \xymatrix{
     V \times \sco_M(V)^k \ar[r]^-{ \id \times \Phi\_V} \ar[d]\_{ \ev_{\sco_M^k,V}} &  V \times \cale(V) \ar[d]^{ \ev_{\cale,V}} \\\  V \times \bbr^k \ar[r]\_-{ \phi} &  E\|\_V}
    \end{xy}
    \end{equation}
where the vertical maps are the evaluation maps defined <a href="#mod-eval" style="color: #f5f5f5; font-family: 'Lora', serif; font-size: 1em; text-decoration: underline;">here</a>.

* If $\\{W_i,T_{ji}\\}_{i,j\in I}$ is a $\GL(k)$-cocycle of $\cale$, then it is also a $\GL(k)$-cocycle of $E$.
</div>

The proof of the theorem follows immediately from the construction given above.

Now, we define a functor

\begin{equation}\label{vec-fun-eqn}
V: \lfMod_M \to \ltVect_M
\end{equation}

on objects by letting $V(\cale)$ be the vector bundle constructed in the theorem. For its action on morphisms:

<div class="highlight-box">
**Definition.** Let $\eta:\cale \to \cale'$ be an $\sco_M$-linear morphism of two locally free modules over a manifold $M$. We define the action of the functor \eqref{vec-fun-eqn} on $\eta$ by unioning over fibers:

\begin{equation}\label{yeah-eqn}
V(\eta) = \bigsqcup_{p\in M} \eta_p: V(\cale) \to V(\cale').
\end{equation}

*Note*: Here, I am letting $V(\cale)$ and $V(\cale')$ denote the total spaces $E$ and $E'$, which are the disjoint unions of the fibers of $\cale$ and $\cale'$.
</div>

<div class="highlight-box2">
**Exercise.**

1. Prove that \eqref{yeah-eqn} is actually a morphism of vector bundles. In particular, prove that it is smooth.

2. Prove that the operation $\eta \mapsto V(\eta)$ preserves compositions and identity morphisms, and conclude that \eqeref{vec-fun-eqn} is indeed a functor.
</div>
</section>















{% assign sec_num = sec_num | plus: 1 %}
{% assign sec_idx = sec_idx | plus: 1 %}
<section data-sec-title="{{ post_num }}.{{ sec_num }}. {{ page.sections[sec_idx] }}">
## {{ post_num }}.{{ sec_num }}. {{ page.sections[sec_idx] }}

We have (finally!) reached the final section of this post, in which we prove that the functors

\begin{equation}\notag
S: \ltVect_M \leftrightarrows \lfMod_M :V
\end{equation}

are mutually inverse equivalences of categories. This will require us to construct the natural isomorphisms between the composite functors $S\circ V$ and $V\circ S$ and the respective identity functors on $\lfMod_M$ and $\ltVect_M$. The first step in this construction is given in the following, which uses the evaluation maps defined <a href="#mod-eval">here</a> and <a href="#vb-eval">here</a>.

<div class="highlight-box">
**Theorem.** Let $M$ be a manifold.

1. Let $E$ be a rank-$k$ locally trivial vector bundle over $M$ with module of sections $\cale$. Then there is a unique vector bundle morphism
    \begin{equation}\label{boo1-eqn}
    \dev_E: V(\cale) \to E
    \end{equation}
which on fibers over a point $p\in M$ is given by the evaluation map
    \begin{equation}\label{boo2-eqn}
    (\dev_E)\_p = \ev_{E,p} : \cale_p \otimes_{\sco_{M,p}} \kappa(p) \to E_p.
    \end{equation}

2. Let $\cale$ be a rank-$k$ locally free $\sco_M$-module with associated vector bundle $E$. Then there is a unique $\sco_M$-linear morphism
    \begin{equation}\label{you1-eqn}
    \eta_\cale : \cale \to S(E)
    \end{equation}
which on sections over an open set $W$ is given by the adjoint evaluation map
    \begin{equation}\label{you2-eqn}
    (\eta_\cale)\_W = \ev_{\cale,W}^\ast: \cale(W) \to \Gamma(W,E).
    \end{equation}
</div>

(1.): We *define* the map \eqref{boo1-eqn} to have fiber maps \eqref{boo2-eqn}. So, we need only check that $\dev_E$ is smooth. For this, we use the two main theorems (<a href="#vb-to-mod">here</a> and <a href="#mod-to-vb">here</a>). From them, we know that if $E$ trivializes over an open set $W$ in $M$ with trivialization

\begin{equation}\notag
\phi: W\times \bbr^k \to E\|\_W,
\end{equation}

then:

1. The module of sections $\cale$ of $E$ trivializes over $W$ with a trivialization
    \begin{equation}\notag
    \Phi: \sco_W^k \to \cale\|\_W
    \end{equation}

2. The vector bundle $V(\cale)$ trivializes over $W$ with a trivialization
    \begin{equation}\notag
    \phi': W \times \bbr^k \to V(\cale)\|\_W
    \end{equation}

3. The trivializations $\Phi$ and $\phi'$ fit into a composite commutative diagram
    \begin{equation}\notag
    \begin{xy}
    \xymatrix{  \bbr^k \ar[r]^-{ \phi_p'} &  \cale_p \otimes \kappa(p) \ar[d]^{ = }  \\\  \kappa(p)^k \ar[r]^-{ \Phi_p} \ar[d]\_{\ev_{\sco_M^k,p}} \ar[u]^{ \ev_{\sco_M^k,p}} &  \cale_p \otimes \kappa(p) \ar[d]^{\ev_{E,p}}  \\\  \bbr^k \ar[r]\_-{ \phi_p} &  E_p}
    \end{xy}
    \end{equation}

Thus, we have a commutative diagram

\begin{equation}\notag
\begin{xy}
\xymatrix{  \bigsqcup_{p\in W} (\cale_p \otimes \kappa(p)) \ar[r]^-{ \dev\_E} &  \bigsqcup_{p\in W} E_p \\\  W\times \bbr^k \ar[r]\_-{=} \ar[u]^{\phi'} &  W \times \bbr^k \ar[u]\_{ \phi} }
\end{xy}
\end{equation}

from which it follows immediately that $\dev_E$ is smooth.

(2.): We *define* the map \eqref{you1-eqn} to have section maps \eqref{you2-eqn}. So, we first need to check that the map \eqref{you2-eqn} is well-defined, i.e., that the image of the adjoint evaluation map over $W$ actually lands in the module of sections $\Gamma(W,E)$. To do this, remember that the image of a section $s\in \cale(W)$ under the adjoint evaluation map is the function

\begin{equation}\label{blank-eqn}
s: W \to \bigsqcup_{p\in W} E_p = E\|\_W, \quad s \mapsto (p,s(p)),
\end{equation}

where $s(p)$ denotes the image of $s$ in the fiber $E_p = \cale_p \otimes_{\sco_{M,p}} \kappa(p)$. In particular, we are using the single symbol $s$ to denote the abstract section $s\in \cale(W)$, and also the function \eqref{blank-eqn}. Thus, to show that \eqref{you2-eqn} is well-defined, we need to show that the function \eqref{blank-eqn} is smooth.

Fixing a point $p\in W$ and shrinking $W$ if needed, we may assume that $\cale$ trivializes over $W$ with trivialization

\begin{equation}\notag
\Phi:  \sco_W^k \to \cale\|\_W.
\end{equation}

Then, by construction, the vector bundle $E$ also trivializes over $W$ with trivialization

\begin{equation}\notag
\phi: W \times \bbr^k \to E\|\_W,
\end{equation}

such that $\Phi_W$ and $\phi$ coincide up to "evaluation over $W$"; see the <a href="#mod-to-vb">main theorem</a>. In particular, if we have

\begin{equation}\notag
s = \Phi_W(f_1,\ldots,f_k)
\end{equation}

for some $f_1,\ldots,f_k\in \sco_M(W)$, then

\begin{equation}\notag
s(p) = \phi(p,f_1(p),\ldots,f_k(p)).
\end{equation}

But this means that the composite of the diffeomorphism $\phi^{-1}$ with the map \eqref{blank-eqn} is given by

\begin{equation}\notag
p \mapsto (p,f_1(p),\ldots,f_k(p))
\end{equation}

which clearly smoothly depends on $p$. Thus \eqref{blank-eqn} is smooth, so the image of \eqref{you2-eqn} does indeed land in $\Gamma(W,E)$. I will leave the rest of the proof up to you, to check that \eqref{you1-eqn} is indeed an $\sco_M$-linear morphism. Q.E.D.

We now have enough to state and prove the main theorem of this post:

<div class="highlight-box">
**Theorem (Equivalence of locally free modules and locally trivial vector bundles).** Let $M$ be a manifold and $S$ and $V$ the functors

\begin{equation}\notag
S: \ltVect_M \leftrightarrows \lfMod_M :V
\end{equation}

1. Letting $I$ be the identity functor on $\ltVect_M$, there is a natural isomorphism
    \begin{equation}\notag
    \dev : V \circ S \to I
    \end{equation}
which, for a locally trivial vector bundle $E$ over $M$ with module of sections $\cale$, is given by the vector bundle morphism
    \begin{equation}\label{tv1-eqn}
    \dev_E:V(\cale) \to E
    \end{equation}
described above (see \eqref{boo1-eqn}) in the previous theorem.

2. Letting $I$ be the identity functor on $\lfMod_M$, there is a natural isomorphism
    \begin{equation}\notag
    \eta : I \to S \circ V
    \end{equation}
which, for a locally free $\sco_M$-module $\cale$ over $M$ with associated vector bundle $E$, is given by the $\sco_M$-linear morphism
    \begin{equation}\label{tv2-eqn}
    \eta_\cale : \cale \to S(E)
    \end{equation}
described above (see \eqref{you1-eqn}) in the previous theorem.

In particular, the categories $\ltVect_M$ and $\lfMod_M$ are equivalent.
</div>

I will quickly sketch the outline. First, note that \eqref{tv1-eqn} is an isomorphism of vector bundles since it is an isomorphism on fibers and both $V(\cale)$ and $E$ are locally trivial (see <a href="#loc-free-vb">here</a>). Then, to complete the proof of part (1.), one needs to check that $\dev$ is indeed a natural transformation, which I will leave for you.

Then, to prove that \eqref{tv2-eqn} is an isomorphism, we may similarly take advantage of the fact both $\cale$ and $S(E)$ are locally free and check that $\eta_\cale$ is an isomorphism on fibers (see <a href="#loc-free-mod">here</a>). But, as you may check, the fiber map

\begin{equation}\notag
(\eta_\cale)\_p : E\_p \to S(E)\_p \otimes_{\sco_{M,p}} \kappa(p)
\end{equation}

is actually the *inverse* of the (isomorphic) evaluation map

\begin{equation}\notag
\ev_{E,p}: S(E)\_p \otimes_{\sco_{M,p}} \kappa(p) \to E\_p.
\end{equation}

Thus, \eqref{tv2-eqn} is indeed an isomorphism. Then, to complete the proof, one needs to check that $\eta$ is a natural transformation, which I will again leave to you. Q.E.D.
</section>







{% assign sec_num = sec_num | plus: 1 %}
{% assign sec_idx = sec_idx | plus: 1 %}
<section data-sec-title="{{ post_num }}.{{ sec_num }}. {{ page.sections[sec_idx] }}">
## {{ post_num }}.{{ sec_num }}. {{ page.sections[sec_idx] }}

Here, we prove two "construction" lemmas that we will use to obtain manifold structures on the vector bundles associated with locally free modules. The first lemma constructs topologies, while the second lemma constructs structure sheaves.

<div class="highlight-box">
**Topology Construction Lemma.** Let $X$ be a set, let $\\{U_i\\}_{i\in I}$ be a cover of $X$, and suppose for each $i$ we are given a bijective map

\begin{equation}\notag
\phi_i: Y_i \to U_i
\end{equation}

where $Y_i$ is a topological space. Furthermore, suppose that:

1. For each $i$ and $j$, the sets $\phi_i^{-1}(U_i\cap U_j)$ and $\phi_j^{-1}(U_i \cap U_j)$ are open in $Y_i$ and $Y_j$, respectively.

2. If $U_i \cap U_j \neq \emptyset$, then
    \begin{equation}\notag
    \phi_j^{-1} \circ \phi_i : \phi_i^{-1}(U_i \cap U_j) \to \phi_j^{-1}(U_i\cap U_j)
    \end{equation}
is continuous.

3. Each $Y_i$ is second-countable, and countably many of the $U_i$'s cover $X$.

4. Each $Y_i$ is Hausdorff, and whenever $p$ and $q$ are distinct points in $X$, either there exists a $U_i$ containing both $p$ and $q$, or there exists disjoint $U_i$ and $U_j$ with $p\in U_i$ and $q\in U_j$.

Then there exists a unique topology on $X$ for which each $\phi_i$ is continuous. This topology is second-countable and Hausdorff, it contains each $U_i$, and not only is each $\phi_i$ continuous, they are actually homeomorphisms.
</div>

Suppose we expand the codomain of the $\phi_i$'s to

\begin{equation}\notag
\phi_i:Y_i \to X.
\end{equation}

Then the topology on $X$ is the finest topology for which each of the maps $\phi_i$ is continuous; thus, a subset $V\subseteq X$ is open if and only if $\phi_i^{-1}(V)\subseteq Y_i$ is open, for each $i\in I$. This topology is clearly the *unique* topology for which each $\phi_i$ is continuous. I will leave it to you to prove that this topology is second-countable and Hausdorff.

Thus, we need only prove that each $U_i$ is open and each $\phi_i$ is a homeomorphism onto $U_i$. To do this, it will be convenient to prove that the following two conditions on a subset $V\subseteq X$ are equivalent:

<div class="highlight-box2">
1. The inclusion
    \begin{equation}\notag
    \phi_i^{-1}(V) \subseteq Y_i
    \end{equation}
is open, for every $i\in I$.

2. There is a subset $J\subseteq I$ of indices such that $V \subseteq \bigcup_{j\in J} U_j$ and
    \begin{equation}\notag
    \phi_j^{-1}(V) \subseteq Y_j
    \end{equation}
is open, for every $j\in J$.
</div>

Of course, the condition in (1.) is nothing but the condition defining openness of $V$ in $X$. Note first that (1.) clearly implies (2.). For the converse, let $i \in I$ and note that

\begin{equation}\label{who10-eqn}
\phi_i^{-1}(V) = \phi_i^{-1}(V\cap U_i) = \bigcup_{j\in J} \phi_i^{-1}(V\cap U_i \cap U_j).
\end{equation}

But $\phi_j^{-1}(V\cap U_j)$ is assumed open in $Y_j$ for each $j\in J$, and therefore

\begin{equation}\notag
\phi_j^{-1}(V\cap U_i \cap U_j)=\phi_j^{-1}(V\cap U_j) \cap \phi_j^{-1}(U_i\cap U_j) \subseteq \phi_j^{-1}(U_i \cap U_j)
\end{equation}

is an open inclusion. Then $\phi_i^{-1}\circ \phi_j$ is a homeomorphism by hypothesis, and hence

\begin{equation}\notag
\phi_i^{-1}(V\cap U_i \cap U_j)= (\phi_i^{-1}\circ \phi_j)\left(\phi_j^{-1}(V\cap U_i \cap U_j) \right) \subseteq \phi_i^{-1}(U_i\cap U_j)
\end{equation}

is an open inclusion. However, $\phi_i^{-1}(U_i\cap U_j)$ is open in $Y_i$ by hypothesis, and hence each of the sets on the right-hand side of \eqref{who10-eqn} is open in $Y_i$. Thus, (2.) implies (1.).

In view of the equivalence of (1.) and (2.), it follows immediately that each $U_i$ is open. I will leave it to you to prove then that each $\phi_i$ is a homeomorphism, which would complete the proof. Q.E.D.


<div class="highlight-box">
**Structure Sheaf Construction Lemma.** Let $X$ be a topological space, let $\\{U_i\\}_{i\in I}$ be an open cover of $X$, and suppose for each $i$ we are given a continuous map

\begin{equation}\notag
\phi_i: Y_i \to U_i
\end{equation}

where $Y_i$ is the underlying topological space of a locally ringed space $(Y_i ,\sco_{Y_i})$. Furthermore, suppose that:

1. Each $\phi_i$ is a homeomorphism.

2. If $U_i \cap U_j \neq \emptyset$, then
    \begin{equation}\notag
    \phi_j^{-1} \circ \phi_i : \phi_i^{-1}(U_i \cap U_j) \to \phi_j^{-1}(U_i\cap U_j)
    \end{equation}
is a morphism of locally ringed spaces.

Then there exists a unique structure sheaf $\sco_X$ on $X$ for which each $\phi_i$ is a morphism of locally ringed spaces. In fact, not only is each $\phi_i$ a morphism, but they are actually isomorphisms.
</div>

Suppose we expand the codomain of the $\phi_i$'s to

\begin{equation}\notag
\phi_i:Y_i \to X.
\end{equation}

Given a nonempty open set $V\subseteq X$, we define $\sco_X(V)$ to be the set of those functions $f:V \to \bbr$ such that $f\circ \phi_i \in \sco_{Y_i}(\phi_i^{-1}(V))$, for each $i\in I$. I will leave it to you to check that this definition yields a well-defined sheaf $\sco_X$ for which each $\phi_i$ is a morphism of locally ringed spaces, and that it is the *unique* sheaf on $X$ with this property.

Thus, we need only prove that each $\phi_i$ is actually an isomorphism of ringed spaces

\begin{equation}\notag
\phi_i:(Y_i,\sco_{Y_i}) \to (U_i,\sco_{U_i}),
\end{equation}

where $\sco_{U_i}$ is the restriction of $\sco_X$ to the open subset $U_i$. Letting $V\subseteq X$ be a nonempty open set, it will be convenient to prove that the following two conditions on a function $f:V \to \bbr$ are equivalent:

<div class="highlight-box2">
1. We have
    \begin{equation}\notag
    f\circ \phi_i \in \sco_{Y_i}(\phi_i^{-1}(V)),
    \end{equation}
for every $i\in I$.

2. There is a subset $J\subseteq I$ of indices such that $V \subseteq \bigcup_{j\in J} U_j$ and
    \begin{equation}\notag
    f\circ \phi_j \in \sco_{Y_j}(\phi_j^{-1}(V)),
    \end{equation}
for every $j\in J$.
</div>

Notice that condition (1.) is exactly the defining condition for $f$ to be a function in $\sco_X(V)$. Obviously (1.) implies (2.), so we need only prove the converse. For that, let $i\in I$ and note that

\begin{equation}\label{union-eqn}
\phi_i^{-1}(V) = \phi_i^{-1}(V\cap U_i) = \bigcup_{j\in J} \phi_i^{-1}(V\cap U_i \cap U_j).
\end{equation}

But $f\circ \phi_j \in \sco_{Y_j}(\phi_j^{-1}(V\cap U_j))$ for each $j\in J$, and by restriction, we have

\begin{equation}\notag
f\circ \phi_j \in \sco_{Y_j}(\phi_j^{-1}(V\cap U_i \cap U_j))
\end{equation}

for each $i\in I$ as well. But then

\begin{equation}\label{union1-eqn}
f\circ \phi_i = f\circ \phi_j \circ (\phi_j^{-1} \circ \phi_i) \in \sco_{Y_i}(\phi_i^{-1}(V\cap U_i \cap U_j))
\end{equation}

since the composite $\phi_j^{-1} \circ \phi_i$ is a morphism. Thus, in view of \eqref{union-eqn} and \eqref{union1-eqn}, and the fact that $\sco_{Y_i}$ is a sheaf, we see that

\begin{equation}\notag
f\circ \phi_i \in \sco_{Y_i}(\phi_i^{-1}(V)),
\end{equation}

as desired. From the equivalence of (1.) and (2.), it follows immediately that each $\phi_i$ is an isomorphism. Q.E.D.
</section>







{% assign sec_num = sec_num | plus: 1 %}
{% assign sec_idx = sec_idx | plus: 1 %}
<section data-sec-title="{{ post_num }}.{{ sec_num }}. {{ page.sections[sec_idx] }}">
## {{ post_num }}.{{ sec_num }}. {{ page.sections[sec_idx] }}

* L. Conlon. Differentiable manifolds. Reprint of the 2001 second edition. Mod. Birkhäuser Class. *Birkhäuser Boston, Inc., Boston, MA*, 2008.

* B. R. Tennison. Sheaf theory. London Mathematical Society Lecture Note Series, No. 20.
*Cambridge University Press, Cambridge, England-New York-Melbourne*, 1975,
</section>