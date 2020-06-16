var cy = cytoscape({
  container: $('#cy'),
  "elements": {
    "nodes": [
      {
        "data": {
          "name": "Tesla, Inc.",
          "creation": "2003-07-01",
          "label": "Organisation",
          "id": "1"
        }
      }
      ,
      {
        "data": {
          "birthName": "Elon Musk",
          "age": "46",
          "label": "Person",
          "id": "12"
        }
      }
      ,
      {
        "data": {
          "name": "Palo Alto",
          "label": "City",
          "id": "15"
        }
      }
      ,
      {
        "data": {
          "name": "US",
          "label": "Country",
          "id": "33"
        }
      }
    ],
    "edges": [
      {
        "data": {
          "label": "ceo",
          "source": "1",
          "target": "12",
          "id": "EdgeID_1"
        }
      }
      ,
      {
        "data": {
          "label": "location",
          "source": "1",
          "target": "15",
          "id": "EdgeID_2"
        }
      }
      ,
      {
        "data": {
          "label": "country",
          "source": "15",
          "target": "33",
          "id": "EdgeID_3"
        }
      }
      ,
      {
        "data": {
          "label": "is_location_of",
          "source": "33",
          "target": "1",
          "id": "EdgeID_4"
        }
      }
    ]
  },
  style: [
    {
      selector: 'node',
      style: {
        'background-color': '#666',
        'label': 'data(name)'
      }
    },
    { selector: 'node[label = "Person"]', 
      css: {
        'background-color': '#6FB1FC', 
        'content': 'data(birthName)'
      }
    },
    { selector: 'node[label = "Organisation"]', 
      css: {
        'background-color': '#F5A45D'
      }
    },
    {
      selector: 'edge',
      style: {
        'label': 'data(label)',
        // 'width': 3,
        'line-color': '#ccc',
        // 'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle'
      }
    }
  ],
  layout: {
    // name: 'dagre'
    name: 'cose'
  }
});
