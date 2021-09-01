var registerPasswordSubmit = () =>
{
    jQuery("#submit").click(() => {
    $.ajax({
        url: '/password?value='+$('#password').val(),
        success: function(data) {
            if(data.success === 'ok') {
                window.location.href = data.url;
            } else {
                $('#password').val('')
                $('#passwordMessage').html(data.message);
                $('#passwordMessage').css("visibility", "visible");
            }
        },
        dataType: 'json'
    });
    });
};