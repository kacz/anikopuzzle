var registerTrainingsFetcher = () => {
    confirmClicked = (checkbox) => {
           $(checkbox).closest(".trainingContents").children().last().prop( "disabled", ! $(checkbox).is(':checked') );
    };

    addNewTrainings = (newTrainings) => {
        newTrainings.forEach(training => {
               var title = training.title;
               var min = training.minNewTrainings;
               var max = training.maxNewTrainings;

               $("#trainings").append(
               `
               <div class="training activeTraining">
                   <h3 class="trainingTitle">${title}</h3>
                   <div class="trainingContents">
                       <label><input type="checkbox" name="confirm" onclick="confirmClicked(this)">I confirm that I've read all the required supplementary materials and I understand their contents</label>
                       <input type="hidden" value="${min}" name="minNewTrainings">
                       <input type="hidden" value="${max}" name="maxNewTrainings">
                       <br>
                       <button name="submit" disabled="disabled" onclick="submitClicked(this)">Submit</button>
                   </div>
               </div>`
               );
           });
    };

    submitClicked = (button) => {
        var training = $(button).closest(".activeTraining");
        var trainingContents = $(button).closest(".trainingContents");
        training.removeClass("activeTraining");
        trainingContents.children().prop( "disabled", true );
        $(button).prop( "disabled", true );

        var trainingsLeft = $("#trainings").children(".activeTraining").length;
        var minNewTrainings = trainingContents.children("[name=minNewTrainings]").val();
        var maxNewTrainings = trainingContents.children("[name=maxNewTrainings]").val();

        $.ajax({
               url: '/trainings?trainingsLeft='+trainingsLeft+'&minNewTrainings='+minNewTrainings+'&maxNewTrainings='+maxNewTrainings,
               success: function(data) {
                   if(data.password !== undefined) {
                       $('#result').html(data.password);
                   } else {
                       addNewTrainings(data.newTrainings);
                   }
                   training.children(".trainingTitle").addClass("finished")
                   $( "#trainings" ).accordion("refresh");
                   $( "#trainings" ).accordion({active: false});
               },
               dataType: 'json'
           });
    };

    addNewTrainings([{
           'title': 'Q2 Mandatory Information Security Training',
           'minNewTrainings': 0,
           'maxNewTrainings': 0
       },{
           'title': 'Q2 Annual Cyber Awareness Review',
           'minNewTrainings': 0,
           'maxNewTrainings': 0
       },{
           'title': 'Q2 Change Requester Attestation',
           'minNewTrainings': 1,
           'maxNewTrainings': 1
       },{
           'title': 'Q2 Mid Year Colleague Feedback',
           'minNewTrainings': 4,
           'maxNewTrainings': 7
       }]);
}