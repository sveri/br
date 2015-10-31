var t = transit;

function ednToJson(x) {
  var r = t.reader("json");
  return r.read(x);
}

function ednArrayToString(edn){
    var ednString = "[";
    for (i=0;i<edn.length;i++)
    {
        ednString = ednString + '"' + edn[i] + '",';;
    }
    ednString = ednString.substring(0, ednString.length - 1);
    return ednString + "]";
}

d3.json("/rp/decision-tree/tree-id", function(treeData) {
    console.log(ednToJson(ednArrayToString(treeData)));
});


var width = 1000,
    height = 300;

var tree = d3.layout.tree()
    .size([height, width - 160]);

var diagonal = d3.svg.diagonal()
    .projection(function(d) {
        return [d.y, d.x];
    });

var svg = d3.select("#decision_tree").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(40,0)");

var root = getData(),
    nodes = tree.nodes(root),
    links = tree.links(nodes);

var link = svg.selectAll(".link")
    .data(links)
    .enter()
    .append("g")
    .attr("class", "link");

link.append("path")
    .attr("fill", "none")
    .attr("stroke", "#ff8888")
    .attr("stroke-width", "1.5px")
    .attr("d", diagonal);

link.append("text")
    .attr("font-family", "Arial, Helvetica, sans-serif")
    .attr("fill", "Black")
    .style("font", "normal 12px Arial")
    .attr("transform", function(d) {
        return "translate(" +
            ((d.source.y + d.target.y) / 2) + "," +
            ((d.source.x + d.target.x) / 2) + ")";
    })
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .text(function(d) {
        console.log(d.target.rule);
        return d.target.rule;
    });

var node = svg.selectAll(".node")
    .data(nodes)
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
        return "translate(" + d.y + "," + d.x + ")";
    });

node.append("circle")
    .attr("r", 4.5);

node.append("text")
    .attr("dx", function(d) {
        return d.children ? -8 : 8;
    })
    .attr("dy", 3)
    .style("text-anchor", function(d) {
        return d.children ? "end" : "start";
    })
    .text(function(d) {
        return d.name;
    });

function getData() {
    return {
        "name": "0",
        "rule": "null",
        "children": [{
            "name": "2",
            "rule": "sunny",
            "children": [{
                "name": "no(3/100%)",
                "rule": "high"
            }, {
                "name": "yes(2/100%)",
                "rule": "normal"
            }]
        }, {
            "name": "yes(4/100%)",
            "rule": "overcast"
        }, {
            "name": "3",
            "rule": "rainy",
            "children": [{
                "name": "no(2/100%)",
                "rule": "TRUE"
            }, {
                "name": "yes(3/100%)",
                "rule": "FALSE"
            }]
        }]
    };
};