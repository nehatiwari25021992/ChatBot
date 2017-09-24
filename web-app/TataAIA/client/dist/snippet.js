var qad = window.qad || {},parent_container = $("#dynaForm");
 
qad.renderDialog = function(dialog, node) {
    console.log("dialog",dialog)
    console.log("node",node)
 
    this.dialog = dialog;

    if (!node) {

        for (var i = 0; i < dialog.nodes.length; i++) {

            if (dialog.nodes[i].id === dialog.root) {

                node = dialog.nodes[i];
                break;
            }
        }
    }

    if (!node) {

        throw new Error('It is not clear where to go next.');
    }


    switch (node.type) {
        case 'qad.Question':
            this.renderQuestion(node);
            break;
        case 'qad.Answer':
            this.renderAnswer(node);
            break;
    }

    this.currentNode = node;

    return this.el;
};

qad.createElement = function(tagName, content) {
    var el = document.createElement(tagName);
   
    if(tagName === "input"){
        el.setAttribute('conv-question', content);
        el.setAttribute('type', "text");
        el.setAttribute('no-answer', "true");
    }else if(tagName === "select"){
        el.setAttribute('conv-question', content);
    }else{
        el.textContent = content.text;
        el.setAttribute('data-option-id', content.id);
    }
    return el;
};

qad.renderOption = function(tag,option,currentNode) {
    var elOption =  this.createElement('option', option)
    tag.appendChild(elOption)
  
    var optionId = elOption.getAttribute('data-option-id');

    var outboundLink;
    for (var i = 0; i < this.dialog.links.length; i++) {

        var link = this.dialog.links[i];
        if (link.source.id === currentNode.id && link.source.port === optionId) {

            outboundLink = link;
            break;
        }
    }

    if (outboundLink) {

        var nextNode;
        for (var j = 0; j < this.dialog.nodes.length; j++) {

            var node = this.dialog.nodes[j];
            if (node.id === outboundLink.target.id) {

                nextNode = node;
                break;
            }
        }

        if (nextNode) {

            this.renderDialog(this.dialog, nextNode);
        }
    }
   
};

qad.renderQuestion = function(node) {

    var elContent = this.createElement('select', node.question);
   
    for (var i = 0; i < node.options.length; i++) {
        elContent.append(this.renderOption(elContent,node.options[i],node));
    }
    parent_container.append(elContent)

};

qad.renderAnswer = function(node) {
    var elContent = this.createElement('input', node.answer);
    parent_container.append(elContent)
};

qad.onOptionClick = function(evt) {

    var elOption = evt.target;
    var optionId = elOption.getAttribute('data-option-id');

    var outboundLink;
    for (var i = 0; i < this.dialog.links.length; i++) {

        var link = this.dialog.links[i];
        if (link.source.id === this.currentNode.id && link.source.port === optionId) {

            outboundLink = link;
            break;
        }
    }

    if (outboundLink) {

        var nextNode;
        for (var j = 0; j < this.dialog.nodes.length; j++) {

            var node = this.dialog.nodes[j];
            if (node.id === outboundLink.target.id) {

                nextNode = node;
                break;
            }
        }

        if (nextNode) {

            this.renderDialog(this.dialog, nextNode);
        }
    }
};
