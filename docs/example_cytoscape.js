$(function(){
  var elements = {
      nodes:[
          {data: {id: '172', name: 'Tom Cruise', label: 'Person'}},
          {data: {id: '183', title: 'Top Gun', label: 'Movie'}}
      ],
      edges:[
          {data: {source: '172', target: '183', relationship: 'Acted_In'}}
      ],
  }

  var style = [
      { selector: 'node[label = "Person"]', 
        css: {'background-color': '#6FB1FC', 'content': 'data(name)'}
      },
      { selector: 'node[label = "Movie"]', 
        css: {'background-color': '#F5A45D', 'content': 'data(title)'}
      },
      { selector: 'edge', 
        css: {'content': 'data(relationship)', 'target-arrow-shape': 'triangle'}
      } 
  ]

  var layout = {
      name : grid
  }

  var cyto = cytoscape({ 
    container: document.getElementById('cyto'),
    elements: elements,
    style: style,
    layout: layout,
  });
});
