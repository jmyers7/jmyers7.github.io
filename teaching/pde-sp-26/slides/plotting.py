import plotly.graph_objects as go

bg_color = "#FAF9F6"
line_color = "#121212"
grid_color = "#D0D0D0"


def plot_animation_2d(functions, colors, title, x_vals, y_vals, t_vals, labels=None):
    if labels is None:
        labels = [""] * len(functions)

    fig = go.Figure()

    for i, (function, label, color) in enumerate(zip(functions, labels, colors)):
        fig.add_trace(
            go.Scatter(
                x=x_vals,
                y=function(x_vals, t_vals[0]),
                mode="lines",
                name=label,
                line=dict(
                    color=color,
                    width=3,
                ),
            )
        )

    frames = []
    for t in t_vals:
        frame_data = []
        for function, label, color in zip(functions, labels, colors):
            frame_data.append(
                go.Scatter(
                    x=x_vals,
                    y=function(x_vals, t),
                    mode="lines",
                    name=label,
                    line=dict(color=color, width=3),
                )
            )
        frames.append(
            go.Frame(
                data=frame_data,
                name=f"t={t:.2f}",
            )
        )

    fig.frames = frames

    fig.update_layout(
        title=title,
        xaxis_title="x",
        yaxis_title="y(x,t)",
        autosize=True,
        margin=dict(t=60, b=50, l=50, r=50),
        paper_bgcolor=bg_color,
        plot_bgcolor=bg_color,
        font=dict(
            family="monospace",
            size=14,
            color=line_color,
        ),
        xaxis=dict(
            gridcolor=grid_color,
            zerolinecolor=line_color,
        ),
        yaxis=dict(
            gridcolor=grid_color,
            zerolinecolor=line_color,
            range=y_vals,
        ),
        showlegend=len(functions) > 1,
        legend=dict(
            x=1.02,
            y=1,
            xanchor="left",
            yanchor="top",
        ),
        sliders=[
            dict(
                active=0,
                len=0.4,
                x=0,
                y=0,
                xanchor="left",
                yanchor="top",
                currentvalue=dict(prefix="t = ", visible=True, xanchor="right"),
                pad=dict(b=10, t=50),
                minorticklen=0,
                steps=[
                    dict(
                        args=[
                            [f"t={t:.2f}"],
                            dict(frame=dict(duration=0, redraw=True), mode="immediate"),
                        ],
                        label=f"{t:.1f}",
                        method="animate",
                    )
                    for t in t_vals
                ],
            ),
        ],
    )

    fig.show()


def plot_3d(X, Y, Z, title):
    fig = go.Figure(
        data=[
            go.Surface(
                z=Z,
                x=X,
                y=Y,
                showscale=False,
                colorscale="Plasma",
                contours=dict(
                    x=dict(show=True, color=line_color, width=2),
                    y=dict(show=True, color=line_color, width=2),
                ),
            )
        ]
    )
    fig.update_layout(
        title=title,
        autosize=True,
        margin=dict(t=60, b=50, l=50, r=50),
        paper_bgcolor=bg_color,
        font=dict(
            family="monospace",
            size=14,
            color=line_color,
        ),
        scene=dict(
            bgcolor=bg_color,
            xaxis_title="x",
            yaxis_title="t",
            zaxis_title="y(x,t)",
            xaxis=dict(
                gridcolor=grid_color,
                zerolinecolor=line_color,
                backgroundcolor=bg_color,
            ),
            yaxis=dict(
                gridcolor=grid_color,
                zerolinecolor=line_color,
                backgroundcolor=bg_color,
            ),
            zaxis=dict(
                gridcolor=grid_color,
                zerolinecolor=line_color,
                backgroundcolor=bg_color,
            ),
        ),
    )

    fig.show()
