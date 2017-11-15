var datas = []
var $datasTable = $('#DatasTable');
var $navTab = $('#navTab');

var activeTab = "Mails";
var $MailsTab = $("a[href='#Mails']");
var $TATab = $("a[href='#TA']");
var $NLUTab = $("a[href='#NLU']");
var $DTab = $("a[href='#D']");
var $VRTab = $("a[href='#VR']");
var $FRTab = $("a[href='#FR']");
var $TRTab = $("a[href='#TR']");
var $BPSHTab = $("a[href='#BPSH']");

var previousTab;
var $activeSubDatasTable;
var curEl = {name: "", type: ""};

$(document)
.ready(function() {
  $('#DatasToolbar').hide();
  buildMailsTable($datasTable, mailsCols, datas, false);

})
.ajaxStart(function(){
    $("div#Loading").addClass('show');
})
.ajaxStop(function(){
    $("div#Loading").removeClass('show');
});

$navTab.on('show.bs.tab', function(event){
    activeTab = $(event.target).text();         // active tab
		// console.log("Event show.bs.tab: activeTab=" + activeTab);
    previousTab = $(event.relatedTarget).text();  // previous tab
		// console.log("Event show.bs.tab: previousTab=" + previousTab);
});

$datasTable.on('reset-view.bs.table', function(){
  // console.log("++++++++++++++on passe dans reset-view");
  // console.log("activeTab=" + activeTab);
  // console.log("previousTab=" + previousTab);
  if($activeSubDatasTable != undefined){
    var v = $activeSubDatasTable.bootstrapTable('getData');
    // console.log("+++++++++++ $activeSubDatasTable");
    // console.log(v);
    var $tableRows = $activeSubDatasTable.find('tbody tr');
    // console.log("++++++++++ $tableRows");
    // console.log($tableRows);
    $.each(v, function(i, row){
    });
  }
});

$datasTable.on('expand-row.bs.table', function (index, row, $detail) {
  if(!$detail.analysis.ta){
    ShowAlert('Click <i class="glyphicons glyphicons-cogwheels"></i>', 'to start Watson analysis before visiting tabs.', "alert-warning", "bottom");
  }
});

var mailsCols = [];
// relationCols.push({field:"checkbox", checkbox: "true"});
mailsCols.push({field:"index", title: "index", formatter: "indexFormatter", sortable: false});
// mailsCols.push({field:"subject", title: "Subject", formatter: "subjectFormatter", sortable: true});
mailsCols.push({field:"subject", title: "Subject", footerFormatter: "subjectFormatter", editable: {type: "textarea", rows: 4}, sortable: true});
mailsCols.push({field:"content", title: "Content", editable: {type: "textarea", rows: 8}, sortable: true});
// mailsCols.push({field:"url", title: "Url", editable: {type: "textarea", rows: 4}, sortable: true});
mailsCols.push({field:"attached", title: '<i class="glyphicons glyphicons-paperclip"></i>', align: "center"});
mailsCols.push({field:"picture", title: '<i class="glyphicons glyphicons-picture"></i>', formatter: "picFormatter", align: "center"});
mailsCols.push({field:"face", title: '<i class="glyphicons glyphicons-user"></i>', formatter: "picFormatter", align: "center"});
mailsCols.push({field:"tip", title: '<i class="glyphicons glyphicons-text-background"></i>', formatter: "picFormatter", align: "center"});

function picFormatter(value, row, index){
  if(value != undefined){
    return [
      '<img src="res/mails/' + value + '" class="img-thumbnail img-rounded img-responsive center-block" alt="' + value + '">'
    ].join();
  }
}

var taCols = [];
taCols.push({value: "tone", field:"tone", title: "Tone", formatter: "toneFormatter", sortable: false});
taCols.push({value:"score", field:"score", title: "Score", formatter: "scoreFormatter", sortable: true});

var nluCols = [];
nluCols.push({field:"label", title: "Label", formatter: "labelFormatter", sortable: false});
nluCols.push({field:"score", title: "Score", formatter: "scoreFormatter", sortable: true});

var dCols = [];
dCols.push({field:"dbpedia_resource", title: "Dbpedia Resource", formatter: "dbpedia_resourceFormatter", sortable: false});
dCols.push({field:"relevance", title: "Relevance", formatter: "relevanceFormatter", sortable: true});
dCols.push({field:"text", title: "Text", formatter: "textFormatter", sortable: true});

var vrCols = [];
vrCols.push({field:"class", title: "Class", formatter: "classFormatter", sortable: true});
vrCols.push({field:"score", title: "Score", formatter: "scoreFormatter", sortable: true});
vrCols.push({field:"type_hierarchy", title: "Type Hierarchy", formatter: "type_hierarchyFormatter", sortable: true});

var frCols = [];
frCols.push({field:"ageMin", title: "Age Min", formatter: "ageMinFormatter", sortable: true});
frCols.push({field:"ageMax", title: "Age Max", formatter: "ageMaxFormatter", sortable: true});
frCols.push({field:"ageScore", title: "Age Score", formatter: "ageScoreFormatter", sortable: true});
frCols.push({field:"gender", title: "Gender", formatter: "genderFormatter", sortable: true});
frCols.push({field:"genderScore", title: "Gender Score", formatter: "genderScoreFormatter", sortable: true});

var trCols = [];
trCols.push({field:"word", title: "Word", formatter: "wordFormatter", sortable: true});
trCols.push({field:"score", title: "Score", formatter: "scoreFormatter", sortable: true});
trCols.push({field:"height", title: "Height", formatter: "trHeightFormatter", sortable: true});
trCols.push({field:"left", title: "Left", formatter: "trLeftFormatter", sortable: true});
trCols.push({field:"top", title: "Top", formatter: "trTopFormatter", sortable: true});
trCols.push({field:"width", title: "Width", formatter: "trWidthFormatter", sortable: true});

function trHeightFormatter(value, row, index) {
  return row.location.height;
}
function trLeftFormatter(value, row, index) {
  return row.location.left;
}
function trWidthFormatter(value, row, index) {
  return row.location.width;
}
function trTopFormatter(value, row, index) {
  return row.location.top;
}
function ageMinFormatter(value, row, index) {
  return row.age.min;
}
function ageMaxFormatter(value, row, index) {
  return row.age.max;
}
function ageScoreFormatter(value, row, index) {
  return row.age.score;
}
function genderFormatter(value, row, index) {
  return row.gender.gender;
}
function genderScoreFormatter(value, row, index) {
  return row.gender.score;
}
function dbpedia_resourceFormatter(value, row, index) {
  return row.dbpedia_resource;
}
function relevanceFormatter(value, row, index) {
  return row.relevance;
}
function textFormatter(value, row, index) {
  return row.text;
}
function type_hierarchyFormatter(value, row, index) {
  return row.type_hierarchy;
}
function classFormatter(value, row, index) {
  return row.class;
}
function toneFormatter(value, row, index) {
  return row.tone_name;
}
function labelFormatter(value, row, index) {
  return row.label;
}
function scoreFormatter(value, row, index) {
  return row.score;
}
function wordFormatter(value, row, index) {
  return row.word;
}

$datasTable.on('reset-view.bs.table', function(){

});

function filter(){
  var v = $datasTable.bootstrapTable('getData');
  var $tableRows = $datasTable.find('tbody tr');
  $.each(v, function(i, row){
    $tableRows.eq(i).show();
  });
  $.each(v, function(i, row){
    if(activeTab == "Discovery" && !row.attached){
      $tableRows.eq(i).hide();
    }
    if(activeTab == "Visual Recognition" && !row.picture){
      $tableRows.eq(i).hide();
    }
    if(activeTab == "Face Recognition" && !row.face){
      $tableRows.eq(i).hide();
    }
    if(activeTab == "Text Recognition" && !row.tip){
      $tableRows.eq(i).hide();
    }
    if(activeTab == "Delivered by Paris BPSH"){
      $tableRows.eq(i).hide();
    }
  });
}

function bsFilter(){
  $datasTable.bootstrapTable("filterBy", {});
  var v = $datasTable.bootstrapTable('getData');
  $.each(v, function(i, row){
    if(activeTab == "Discovery" && !row.attached){
      $datasTable.bootstrapTable("hideRow", row.index);
    }
    if(activeTab == "Visual Recognition" && !row.picture){
      $datasTable.bootstrapTable("hideRow", row.index);
    }
    if(activeTab == "Face Recognition" && !row.face){
      $datasTable.bootstrapTable("hideRow", row.index);
    }
    if(activeTab == "Text Recognition" && !row.tip){
      $datasTable.bootstrapTable("hideRow", row.index);
    }
    if(activeTab == "Delivered by Paris BPSH"){
      $datasTable.bootstrapTable("hideRow", row.index);
    }
  });
}

$MailsTab.on('shown.bs.tab', function(e) {
  buildMailsTable($datasTable, mailsCols, datas, false);
  $datasTable.bootstrapTable("collapseAllRows");
});
$TATab.on('shown.bs.tab', function(e) {
  buildMailsTable($datasTable, mailsCols, datas, true);
  $datasTable.bootstrapTable("collapseAllRows");
});
$NLUTab.on('shown.bs.tab', function(e) {
  buildMailsTable($datasTable, mailsCols, datas, true);
  $datasTable.bootstrapTable("collapseAllRows");
});
$DTab.on('shown.bs.tab', function(e) {
  buildMailsTable($datasTable, mailsCols, datas, true);
  $datasTable.bootstrapTable("collapseAllRows");
});
$VRTab.on('shown.bs.tab', function(e) {
  buildMailsTable($datasTable, mailsCols, datas, true);
  $datasTable.bootstrapTable("collapseAllRows");
});
$FRTab.on('shown.bs.tab', function(e) {
  buildMailsTable($datasTable, mailsCols, datas, true);
  $datasTable.bootstrapTable("collapseAllRows");
});
$TRTab.on('shown.bs.tab', function(e) {
  buildMailsTable($datasTable, mailsCols, datas, true);
  $datasTable.bootstrapTable("collapseAllRows");
});
$BPSHTab.on('shown.bs.tab', function(e) {
    $(".panel").show();
    $("#Toolbar").hide();
    $datasTable.hide();
});

$('#modPicture').on('shown.bs.modal', function() {
    $(this).find('.modal-body').empty();
    var html;
    if(curEl.type.match('pic')){
      html='<img src="res/mails/' + curEl.name + '" class="img-rounded img-responsive center-block" alt="' + curEl.name + '">';
    }
    if(curEl.type.match('pdf')){
      html ='<object type="application/pdf" data="res/mails/' + curEl.name + '" width="100%" height="500" style="height: 70vh;"> No Support</object>';
    }
    if(curEl.type.match('doc')){
      html = '<a href="res/mails/' + curEl.name + '" download>' + curEl.name + '</a>';
    }
    $(this).find('.modal-body').append(html);
});

function buildMailsTable($el, cols, data, detailView) {

  $("#Toolbar").show();
  $datasTable.show();
  $(".panel").hide();

  console.log("detailView=" + detailView);
  // $el.bootstrapTable("filterBy", {});

    $el.bootstrapTable({
        columns: cols,
        // url: url,
        // data: data,
        search: false,
				showRefresh: false,
				showColumns: false,
				showToggle: false,
				pagination: false,
				showPaginationSwitch: false,
        idField: "index",
				// toolbar: "#DatasToolbar",
        detailView: true,
        onClickCell: function (field, value, row, $element){
          if(field.match('picture|face|tip') && value != undefined){
            // alert('You click on image ' + value)
            curEl.name = value;
            curEl.type = "pic";
            $('#modPicture').modal('toggle');
          }
          if(field.match('attached') && value != undefined){
            // alert('You click on image ' + value)
            curEl.name = value;
            var ext = value.split('.').pop();
            curEl.type = ext.toLowerCase();
            $('#modPicture').modal('toggle');
          }
        },
        onExpandRow: function (index, row, $detail) {

          var analysis;
          switch(activeTab) {
              case "Tone Analyzer":
                if(row.analysis.ta != undefined){
                  analysis = row.analysis.ta.document_tone.tone_categories[0].tones;
                  expandMailsTable($detail, taCols, row.analysis.ta.document_tone.tone_categories[0].tones, row);
                }
                break;
              case "Natural Language Understanding":
                if(row.analysis.nlu != undefined){
                  analysis = row.analysis.nlu.categories;
                  expandMailsTable($detail, nluCols, analysis, row);
                }
                break;
              case "Discovery":
                if(row.attached != undefined && row.analysis.d != undefined){
                  analysis = row.analysis.d.results[0].enriched_text.concepts;
                  expandMailsTable($detail, dCols, analysis, row);
                }
                break;
              case "Visual Recognition":
                if(row.picture != undefined && row.analysis.vr != undefined){
                  analysis = row.analysis.vr.images[0].classifiers[0].classes;
                  expandMailsTable($detail, vrCols, analysis, row);
                }
                break;
              case "Face Recognition":
                if(row.face != undefined && row.analysis.fr != undefined){
                  analysis = row.analysis.fr.images[0].faces;
                  expandMailsTable($detail, frCols, analysis, row);
                  break;
                }
              case "Text Recognition":
                if(row.tip != undefined && row.analysis.tr != undefined){
                  analysis = row.analysis.tr.images[0].words;
                  expandMailsTable($detail, trCols, analysis, row);
                  break;
                }
              default:
                break;
          }

        }
    });
}

function expandMailsTable($detail, cols, data, parentData) {
    $subtable = $detail.html('<table></table>').find('table');
    console.log("expandTable.data=");
    console.log(data);
    $activeSubDatasTable = $subtable;
    buildMailsSubTable($subtable, cols, data, parentData);
}

function buildMailsSubTable($el, cols, data, parentData){

  console.log("buildSubTable: activeTab=" + activeTab);
  console.log("buildSubTable: previousTab=" + previousTab);

  $el.bootstrapTable({
      columns: cols,
      // url: url,
      data: data,
      showToggle: false,
      search: false,
      checkboxHeader: false,
      idField: "index",
      onEditableInit: function(){
        //Fired when all columns was initialized by $().editable() method.
      },
      onEditableShown: function(editable, field, row, $el){
        //Fired when an editable cell is opened for edits.
      },
      onEditableHidden: function(field, row, $el, reason){
        //Fired when an editable cell is hidden / closed.
      },
      onEditableSave: function (field, row, oldValue, editable) {
        //Fired when an editable cell is saved.
        console.log("---------- buildSubTable: onEditableSave -------------");
        console.log("editable=");
        console.log(editable);
        console.log("field=");
        console.log(field);
        console.log("row=");
        console.log(row);
        console.log("oldValue=");
        console.log(oldValue);
        console.log("---------- buildSubTable: onEditableSave -------------");
      },
      onClickCell: function (field, value, row, $element){

      }
  });
}

function GetMails(){

  var fd = new FormData();
  var file = new Blob(['file contents'], {type: 'plain/text'});

  fd.append('formFieldName', file, 'fileName.txt');

  $.ajax({
    url: "Analyze",
    type: "POST",
    data: fd,
    enctype: 'multipart/form-data',
    dataType: 'json',
    processData: false,  // tell jQuery not to process the data
    contentType: false,   // tell jQuery not to set contentType

    success: function(data) {
      console.log(data);
      $.each(data, function(i, obj){
        if(i == "MAILS"){
          console.log(obj);
          $datasTable.bootstrapTable('load', obj);
        }
      });
			ShowAlert("GetMails()", "Mails downloaded successfully.", "alert-success", "bottom");
		},
		error: function(data) {
			ShowAlert("GetMails()", "Downloading mails failed.", "alert-danger", "bottom");
		}
  });

}

function AnalyzeMails(){

  if($datasTable.bootstrapTable("getData").length == 0){
    ShowAlert("AnalyzeMails()", "No mail to analyze", "alert-info", "bottom");
  }

  $.ajax({
    type: 'POST',
    url: "Analyze",
    dataType: 'json',
    data: '{"text": "text", "integer": 1, "boolean": false}',

    success: function(data) {
			console.log(data);
			if (data.length == 0) {
				ShowAlert("AnalyzeMails()", "No analysis returned", "alert-info", "bottom");
				// return;
			}
      $.each(data, function(i, obj){
        if(i == "MAILS"){
          console.log(obj);
          $datasTable.bootstrapTable('load', obj);
        }
      });
      ShowAlert("AnalyzeMails()", "Mails analyzed successfully.", "alert-success", "bottom");

  	},
      error: function(data) {
          console.log(data);
          ShowAlert("AnalyzeMails()", "Analysis failed.", "alert-danger", "bottom");
    }

  });

}

window.operateRelationEvents = {
    'click .duplicate': function (e, value, row, index) {
      console.log("+++++ on entre dans click .duplicate");
      console.log(e);
      console.log(value);
      console.log(row);
      console.log(index);

        nextIndex = row.index + 1;
        console.log("nextIndex=" + nextIndex);
        var newRow = $.extend({}, row);
        newRow.checkbox = false;
        newRow.pktable_alias = "";
        newRow.fin = false;
        newRow.ref = false;
        newRow.relationship = newRow.relationship.replace(/ = \[FINAL\]\./g, " = ");
        newRow.relationship = newRow.relationship.replace(/ = \[REF\]\./g, " = ");
        console.log("newRow");
        console.log(newRow);
        $activeSubDatasTable.bootstrapTable('insertRow', {index: nextIndex, row: newRow});
        console.log("+++++ on sort de click .duplicate");

    },
    'click .remove': function (e, value, row, index) {
        $activeSubDatasTable.bootstrapTable('remove', {
            field: 'index',
            values: [row.index]
        });
    }
};

window.operateQSEvents = {
    'click .addRelation': function (e, value, row, index) {

      console.log("index=" + index);
      // $datasTable.bootstrapTable('expandAllRows');
      $datasTable.bootstrapTable('expandRow', index);

      console.log("++++++++++++++on passe dans window.operateQSEvents.add");
      if($activeSubDatasTable != ""){

        var v = $activeSubDatasTable.bootstrapTable('getData');
        console.log("+++++++++++ $activeSubDatasTable");

        console.log(v);
        $newRowModal.modal('toggle');
        var qs = row.table_alias + ' - ' + row.type + ' - ' + row.table_name;
        // $('#modQuerySubject').selectpicker('val', qs);

        $('#modQuerySubject').text(qs);
        $('#modKeyName').val("CK_" + row.table_alias);
        $('#modPKTableAlias').val("");
        // $('#modRelathionship').val("[" + row.type.toUpperCase() + "].[" + row.table_alias + "].[] = ");
      }

    },
    'click .expandAllQS': function (e, value, row, index) {
      $datasTable.bootstrapTable("expandAllRows")
    },
    'click .collapseAllQS': function (e, value, row, index) {
      $datasTable.bootstrapTable("collapseAllRows")
    }
};

function operateRelationFormatter(value, row, index) {
    return [
        '<a class="duplicate" href="javascript:void(0)" title="Duplicate">',
        '<i class="glyphicon glyphicon-duplicate"></i>',
        '</a>  ',
        '<a class="remove" href="javascript:void(0)" title="Remove">',
        '<i class="glyphicon glyphicon-trash"></i>',
        '</a>'
    ].join('');
}

function operateQSFormatter(value, row, index) {
    return [
        '<a class="addRelation" href="javascript:void(0)" title="Add Relation">',
        '<i class="glyphicon glyphicon-plus-sign"></i>',
        '</a>  ',
        '<a class="expandAllQS" href="javascript:void(0)" title="Expand all QS">',
        '<i class="glyphicon glyphicon-resize-full"></i>',
        '</a>  ',
        '<a class="collapseAllQS" href="javascript:void(0)" title="Collapse all QS">',
        '<i class="glyphicon glyphicon-resize-small"></i>',
        '</a>'
    ].join('');
}

function boolFormatter(value, row, index) {

  var icon = value == true ? 'glyphicon-check' : 'glyphicon-unchecked'
  if(value == undefined){
      console.log("****** VALUE *********" + value);
      console.log(row);
      icon = 'glyphicon-unchecked';
  }
  return [
    '<a href="javascript:void(0)">',
    '<i class="glyphicon ' + icon + '"></i> ',
    '</a>'
  ].join('');
}

function duplicateFormatter(value, row, index) {
  return [
      '<a class="duplicate" href="javascript:void(0)" title="Duplicate">',
      '<i class="glyphicon glyphicon-duplicate"></i>',
      '</a>'
  ].join('');
}

function removeFormatter(value, row, index) {
  return [
      '<a class="remove" href="javascript:void(0)" title="Remove">',
      '<i class="glyphicon glyphicon-trash"></i>',
      '</a>'
  ].join('');
}

function indexFormatter(value, row, index) {
  row.index = index;
  return index;
}

function updateCell($table, index, field, newValue){

  $table.bootstrapTable("updateCell", {
    index: index,
    field: field,
    value: newValue
  });

}

function updateRow($table, index, row){

  $table.bootstrapTable("updateRow", {
    index: index,
    row: row
  });

}

function AddRow($table, row){

  $table.bootstrapTable("filterBy", {});
	nextIndex = $table.bootstrapTable("getData").length;
	console.log("nextIndex=" + nextIndex);
	$table.bootstrapTable('insertRow', {index: nextIndex, row: row});


}

function ShowAlert(title, message, alertType, area) {

    $('#alertmsg').remove();

    var timeout = 5000;

    if(area == undefined){
      area = "bottom";
    }
    if(alertType.match('warning')){
      area = "bottom";
      timeout = 10000;
    }
    if(alertType.match('danger')){
      area = "bottom";
      timeout = 30000;
    }

    var $newDiv;

    if(alertType.match('alert-success|alert-info')){
      $newDiv = $('<div/>')
       .attr( 'id', 'alertmsg' )
       .html(
          '<h4>' + title + '</h4>' +
          '<p>' +
          message +
          '</p>'
        )
       .addClass('alert ' + alertType + ' flyover flyover-' + area);
    }
    else{
      $newDiv = $('<div/>')
       .attr( 'id', 'alertmsg' )
       .html(
          '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
          '<h4>' + title + '</h4>' +
          '<p>' +
          '<strong>' + message + '</strong>' +
          '</p>'
        )
       .addClass('alert ' + alertType + ' alert-dismissible flyover flyover-' + area);
    }

    $('#Alert').append($newDiv);

    if ( !$('#alertmsg').is( '.in' ) ) {
      $('#alertmsg').addClass('in');

      setTimeout(function() {
         $('#alertmsg').removeClass('in');
      }, timeout);
    }
}

function TestDBConnection() {

    $.ajax({
        type: 'POST',
        url: "TestDBConnection",
        dataType: 'json',

        success: function(data) {
            console.log(data);
            ShowAlert("TestDBConnection()", "Connection to database was successfull.", "alert-success", "bottom");
        },
        error: function(data) {
            console.log(data);
            ShowAlert("TestDBConnection()", "Connection to database failed.", "alert-danger", "bottom");
        }

    });

}

function Reset() {

	var success = "OK";

	$.ajax({
        type: 'POST',
        url: "Reset",
        dataType: 'json',

        success: function(data) {
			success = "OK";
        },
        error: function(data) {
            console.log(data);
   			success = "KO";
        }

    });

	if (success == "KO") {
		ShowAlert("Reset()", "Operation failed.", "alert-danger", "bottom");
	}

  // window.location = window.location.href+'?eraseCache=true';
	location.reload(true);

}

function GetTableData(){
		var data = $datasTable.bootstrapTable("getData");
		console.log("data=");
		console.log(JSON.stringify(data));
    console.log(data);

}

function RemoveAll(){
  $datasTable.bootstrapTable("removeAll");
}

function ExpandAll(){
  $datasTable.bootstrapTable('expandAllRows');
}
