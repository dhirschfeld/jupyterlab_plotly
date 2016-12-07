import React from 'react';
import ReactDOM from 'react-dom';
import Component from './component';
import './index.css';

var MIME_TYPE = 'application/vnd.plotly.v1+json';

//
// Render data to the output area
// 
function render(data, node) {
    ReactDOM.render(<Component data={data} />, node);
}

//
// Register the mime type and append_mime_type function with the notebook's OutputArea
// 
export function register_renderer($) {
  // Get an instance of the OutputArea object from the first CodeCellebook_
  const OutputArea = $('#notebook-container').find('.code_cell').eq(0).data('cell').output_area;
  // A function to render output of 'application/vnd.plotly.v1+json' mime type
  const append_mime = function(json, md, element) {
    const type = MIME_TYPE;
    const toinsert = this.create_output_subarea(md, 'output_Plotly rendered_html', type);
    this.keyboard_manager.register_events(toinsert);
    render(json, toinsert[0]);
    element.append(toinsert);
    return toinsert;
  };
  // Register the mime type and append_mime_type function with the notebook's OutputArea
  OutputArea.register_mime_type(MIME_TYPE, append_mime, {
    // Is output safe?
    safe: true,
    // Index of renderer in `OutputArea.display_order`
    index: 0
  });
}

//
// Re-render cells with output data of 'application/vnd.plotly.v1+json' mime type
// 
export function render_cells($) {
  // Get all cells in notebook
  $('#notebook-container').find('.cell').toArray().forEach(item => {
    const CodeCell = $(item).data('cell');
    // If a cell has output data of 'application/vnd.plotly.v1+json' mime type
    if (CodeCell.output_area && CodeCell.output_area.outputs.find(output => output.data[MIME_TYPE])) {
      // Re-render the cell by executing it
      CodeCell.notebook.render_cell_output(CodeCell);
    }
  });
}
