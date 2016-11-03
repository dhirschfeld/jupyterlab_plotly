# jupyterlab_plotly

A JupyterLab extension for rendering Plotly data

## Prerequisites

* JupyterLab 0.7.0 or later

## Usage

```python
from IPython.display import display
import json

data = [
  {'x': [1999, 2000, 2001, 2002], 'y': [10, 15, 13, 17], 'type': 'scatter'},
  {'x': [1999, 2000, 2001, 2002], 'y': [16, 5, 11, 9], 'type': 'scatter'}
]

layout = {
  'title': 'Sales Growth',
  'xaxis': { 'title': 'Year', 'showgrid': False, 'zeroline': False },
  'yaxis': { 'title': 'Percent', 'showline': False }
}

bundle = {
    'application/vnd.plotly.v1+json': {
        'data': json.loads(json.dumps(data)),
        'layout': json.loads(json.dumps(layout)),
    }
}

display(bundle, raw=True)
```

![output renderer](http://g.recordit.co/l5XTmLwVD4.gif)

## Installation

To install using pip:

```bash
pip install jupyterlab_plotly
jupyter labextension install --py --sys-prefix jupyterlab_plotly
jupyter labextension enable --py --sys-prefix jupyterlab_plotly
```

## Development

For a development install (requires npm version 4 or later), do the following in the repository directory:

```bash
npm install
pip install -e .
jupyter labextension install --symlink --py --sys-prefix jupyterlab_plotly
jupyter labextension enable --py --sys-prefix jupyterlab_plotly
```

To rebuild the extension bundle:

```bash
npm run build
```
