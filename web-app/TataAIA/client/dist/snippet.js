var qad = window.qad || {};
var parent_container = $("#dynaForm")
qad.renderDialog = function(dialog, node) {
    console.log("dialog",dialog)
 
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

    if (!this.el) {
        this.el = this.createElement('div', 'qad-dialog');
    }

    // Empty previously rendered dialog.
    this.el.textContent = '';

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
    el.setAttribute('conv-question', content);
    if(tagName === "input"){
        el.setAttribute('type', "text");
    }
    return el;
};

qad.renderOption = function(tag,option) {
    tag.appendChild()
    this.createElement('option', option.text);
//    var elOption = this.createElement('option', option.text);
//  elOption.textContent = option.text;
// elOption.setAttribute('data-option-id', option.id);

//    var self = this;
//    elOption.addEventListener('click', function(evt) {
//
//        self.onOptionClick(evt);
//
//    }, false);
//
//    return elOption;
};

qad.renderQuestion = function(node) {

    var elContent = this.createElement('select', node.question);
    // var elOptions = this.createElement('option', 'qad-options');

    for (var i = 0; i < node.options.length; i++) {

        elContent.appendChild(this.renderOption(elContent,node.options[i]));
    }
    
    parent_container.append(elContent)

//    var elQuestion = this.createElement('h3', 'qad-question-header');
//    elQuestion.innerHTML = node.question;
//
//    elContent.appendChild(elQuestion);
//    elContent.appendChild(elOptions);
//
//    this.el.appendChild(elContent);
};

qad.renderAnswer = function(node) {

    var elContent = this.createElement('div', 'qad-content');
    var elAnswer = this.createElement('h3', 'qad-answer-header');
    elAnswer.innerHTML = node.answer;

    elContent.appendChild(elAnswer);
    this.el.appendChild(elContent);
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
