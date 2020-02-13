var responseJSON ;
var parentBreed="";

function getList() { 
    //console.log("clicked");
    parentBreed = $('#dogs-list').val();
    $.ajax({
        url:'https://dog.ceo/api/breed/'+parentBreed+'/images/random',
        method:'GET',
        success:function(data){
            imageURL = data.message;
            //console.log("imageURL"+" "+imageURL);
            $('#dog-image').attr('src',imageURL);
        }
    }).fail(function(error){
        console.log(error);
    });
    $('#dogs-type').empty();
    var xHarRequest = new XMLHttpRequest();
            xHarRequest.onload = function(){
             //console.log(xHarRequest.response);
             responseJSON = JSON.parse(xHarRequest.response);
             console.log(responseJSON);
             for(let type in responseJSON.message){
                
                if(type==parentBreed){
                    console.log(type);
                    responseJSON.message[type].forEach(element => {
                        $('#dogs-type').append($('<option>').text(element).attr('value', element));
                    });
                }
             }
             
         }
         xHarRequest.onerror = function () {console.log("failed") ; }
         xHarRequest.open('get','https://dog.ceo/api/breeds/list/all',false);
         xHarRequest.send();

}
$.ajax({
    url:'https://dog.ceo/api/breeds/list/all',
    method:'GET',
    success:function(data){
        $.each(data.message, function(key, value) {
            //console.log(ikey+" "+value.length);
           // if(value.length>0){
                   $('#dogs-list').append($('<option>').text(key).attr('value', key));
            //}
            
        });
    }
}).fail(function(){ console.log('error');});
$('#fetch').click(getList);


//below lines are used to print the subBreeds based on the parentBreed


function fethcRandomDogImage(ans){

           var xHarRequest = new XMLHttpRequest();
            xHarRequest.onload = function(){
             //console.log(xHarRequest.response);
             var responseJSON = JSON.parse(xHarRequest.response);
             var imageURL = responseJSON.message;
             $('#dog-image').attr('src',imageURL);
         }
         xHarRequest.onerror = function () {console.log("failed") ; }
         xHarRequest.open('get','https://dog.ceo/api/breeds/list/all',false);
         xHarRequest.send();
}    
function getImage(){
    let ans = $('#dogs-type').val();
    let u = 'https://dog.ceo/api/breed/'+parentBreed+'/'+ans+'/images/random';
    if(ans==null) {
        u = 'https://dog.ceo/api/breed/'+parentBreed+'/images/random';
    }
    console.log(parentBreed+" "+ ans);
    $.ajax({
        url:u,
        method:'GET',
        success: function (data) {
            imageURL = data.message;
            console.log("imageURL"+" "+imageURL);
            $('#dog-image').attr('src',imageURL);
        }
    })
}


$('#next').click(getImage);