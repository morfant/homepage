// Session.setDefault('tags', 'none');

var tags;
var tagsObj = {};

Template.mindMap.created = function () {
    console.log("mindMap created()");

    var posts = [];
    tags = [];
    tagsObj = {};
    posts = Posts.find({
        "tag": {
            $exists: true,
            $ne: ""
        }
    }).fetch();
    // console.log(posts);

    posts.forEach(function (post) {
        // var explicitSpecialChar = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\$%&\\\=\(\'\"]/gi;
        // var tag = post.tag.replace(explicitSpecialChar, '');
        // console.log(post.tag);
        tag = post.tag.replace(/\s+/gi, '').split(','); // 공백 제거, ','를 기준으로 나눔
        // console.log(tag);

        if (tag != null && tag.length) {
            tag.forEach(function (t) {
                if (t[0] == '#') {
                    var regex = /#+/gi;
                    var rt = t.replace(regex, '');
                    tags.push(rt);
                }
            }, this);
        }

        // console.log(tags);
        // [ "퍼포먼스", "오디오비주얼", "퍼포먼스", "Teensy", "Openframeworks", "AR", "game", "Sound" ]

    }, this);

    // count num of each tag
    tags.forEach(function (item) {
        if (!tagsObj.hasOwnProperty(item)) {
            tagsObj[item] = 1;
        } else {
            tagsObj[item]++;
        }
    });

    console.log(tagsObj);

}


Template.mindMap.events({
    // 'click #add':function(){
    // 	Slices.insert({
    // 		value:Math.floor(Math.random() * 100)
    // 	});
    // },
    // 'click #remove':function(){
    // 	var toRemove = Random.choice(Slices.find().fetch());
    // 	Slices.remove({_id:toRemove._id});
    // },
    // 'click #randomize':function(){
    // 	//loop through bars
    // 	Slices.find({}).forEach(function(bar){
    // 		//update the value of the bar
    // 		Slices.update({_id:bar._id},{$set:{value:Math.floor(Math.random() * 100)}});
    // 	});
    // },
    // 'click #toggleSort':function(){
    // 	if(Session.equals('mindMapSort', 'none')){
    // 		Session.set('mindMapSort','asc');
    // 		Session.set('mindMapSortModifier',{sort:{value:1}});
    // 	}else if(Session.equals('mindMapSort', 'asc')){
    // 		Session.set('mindMapSort','desc');
    // 		Session.set('mindMapSortModifier',{sort:{value:-1}});
    // 	}else{
    // 		Session.set('mindMapSort','none');
    // 		Session.set('mindMapSortModifier',{});
    // 	}
    // }
});

Template.mindMap.rendered = function () {

    /*
    var width = 960,
        height = 500;

    var size = Object.keys(tagsObj).length;
    // console.log(size);

    var nodes = [];
    var max = 0;
    var color = d3.scale.category10();

    for (var property in tagsObj) {
        var node = {};
        if (max < tagsObj[property]) max = tagsObj[property];
        node.name = property;
        var R = d3.scale.pow().domain([1, max]).range([30, 100]);
        node.radius = R(tagsObj[property]);
        // console.log(property);
        nodes.push(node);
        // total += object[property];
    }

    // console.log(nodes);


    var svg = d3.select(".d3").append("svg")
        .attr("width", width)
        .attr("height", height)
        .on("click", handleSVGClick);

    // clear all elements
    svg.selectAll('*').remove();


    var force = d3.layout.force()
        // .friction(0.1)
        .gravity(0.1)
        .charge(function (d, i) {
            // return i ? 500 : -2000;
            // return 200 // negative: push each other, positive: pull each other
            return 0;
        })
        .nodes(nodes)
        .size([width, height]);

    force.start();

    var node = svg.selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("r", function (d) {
            return d.radius;
        })
        .attr('fill-opacity', 0.5)
        .style("fill", function (d, i) {
            return color(i % 11);
        })
        .attr('class', 'tag-node')
        // .on("mouseover", handleMouseOver)
        // .on("mouseout", handleMouseOut)
        .on("click", handleMouseClick)
        .call(force.drag);


        svg.selectAll("text")
            .attr("class", "circle-text")
            .data(nodes)
            .enter().append("text")
            // .attr("id", function (d, i) {
            //     return "circle_" + i;
            // })
            .attr("x", function (d, i) {
                return d.x;
            })
            .attr("y", function (d, i) {
                return d.y;
            })
            .text(function (d) {
                return d.name; // Value of the text
            });

    force.on("tick", function (e) { // when updated
        var q = d3.geom.quadtree(nodes),
            i = 0,
            n = nodes.length;

        while (++i < n) {
            q.visit(collide(nodes[i]));
        }

        svg.selectAll("circle")
            .attr("cx", function (d) {
                return d.x;
            })
            .attr("cy", function (d) {
                return d.y;
            });

        svg.selectAll("text")
            .attr("class", "circle-text")
            .attr("x", function (d) {
                return d.x;
            })
            .attr("y", function (d) {
                return d.y + 5; // adjust pos y as much as half of font size.
            })

    });

    force.on('end', function () {

        // When this function executes, the force layout
        // calculations have concluded. The layout will
        // have set various properties in our nodes and
        // links objects that we can use to position them
        // within the SVG container.

        // First let's reposition the nodes. As the force
        // layout runs it updates the `x` and `y` properties
        // that define where the node should be centered.
        // To move the node, we set the appropriate SVG
        // attributes to their new values. We also have to
        // give the node a non-zero radius so that it's visible
        // in the container.

        // node.attr('r', width/25)
        //     .attr('cx', function(d) { return d.x; })
        //     .attr('cy', function(d) { return d.y; });

        // We also need to update positions of the links.
        // For those elements, the force layout sets the
        // `source` and `target` properties, specifying
        // `x` and `y` values in each case.

        // link.attr('x1', function(d) { return d.source.x; })
        //     .attr('y1', function(d) { return d.source.y; })
        //     .attr('x2', function(d) { return d.target.x; })
        //     .attr('y2', function(d) { return d.target.y; });

    });

    function collide(node) {
        var r = node.radius + 16,
            nx1 = node.x - r,
            nx2 = node.x + r,
            ny1 = node.y - r,
            ny2 = node.y + r;
        return function (quad, x1, y1, x2, y2) {
            if (quad.point && (quad.point !== node)) {
                var x = node.x - quad.point.x,
                    y = node.y - quad.point.y,
                    l = Math.sqrt(x * x + y * y),
                    r = node.radius + quad.point.radius;
                if (l < r) {
                    l = (l - r) / l * .5;
                    node.x -= x *= l;
                    node.y -= y *= l;
                    quad.point.x += x;
                    quad.point.y += y;
                }
            }
            return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        };
    }



    // Create Event Handlers for mouse
    function handleSVGClick() {

        console.log("svg click")
        // var p1 = d3.mouse(this);
        // root.px = p1[0];
        // root.py = p1[1];
        // force.resume();

    }



    function handleMouseOver(d, i) { // Add interactivity

        // console.log("handleMouseOver(): " + i);
        // Use D3 to select element, change color and size
        d3.select(this).style(
            "fill", "orange"
        );

        // .style("fill", function (d, i) {
        // return color(i % 11);
        // })

        // d3.select(this).attr({
        //     fill: "orange",
        //     // r: d.radius * 2
        // });

        // Specify where to put label of text
        svg.append("text").attr({
                id: "circle_" + i, // Create an id for text so we can select it later for removing on mouseout
                x: function () {
                    return (d.x);
                },
                y: function () {
                    return (d.y);
                }
            })
            .text(function () {
                return d.name; // Value of the text
            });
    }

    function handleMouseOut(d, i) {
        // Use D3 to select element, change color back to normal
        // console.log("handleMouseOut()" + i);
        d3.select(this).style(
            "fill", color(i)
        );

        // Select text by id and then remove
        d3.select("#circle_" + i).remove(); // Remove text location
    }

    function handleMouseClick(d, i) {
        console.log("click: " + i);
    }

    */

};