var cam=document.getElementById("camera")
var prediction_1 =""
var prediction_2=""


Webcam.set({
    width:350,height:300,image_format:"png",png_quality:90

})
Webcam.attach("#camera")
function take_snapshot(){
    Webcam.snap(
        function(snap) {
            document.getElementById("result").innerHTML = '<img id="captured_image" src="'+snap+'"/>';
        }
    )
}
console.log(ml5.version)


classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/XWz_7Jo1l/model.json',modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "And the second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}
function check(){
    var image = document.getElementById("captured_image")
    classifier.classify(image,result)
}
function result(error,r){
    if (error){
        console.log(error)
    }
    else{
        console.log(r)
        document.getElementById("result_emotion_name").innerHTML=r[0].label
        document.getElementById("result_emotion_name2").innerHTML=r[1].label
        prediction_1=r[0].label
        prediction_2=r[1].label
        speak();
        if (r[0].label=="happy"){
            document.getElementById("update_emoji").innerHTML="&#128512";
        }
        if (r[0].label=="sad"){
            document.getElementById("update_emoji").innerHTML="&#128542"
        }
        if (r[0].label=="angry"){
            document.getElementById("update_emoji").innerHTML="&#128545"
        }

        if (r[1].label=="happy"){
            document.getElementById("update_emoji2").innerHTML="&#128512";
        }
        if (r[1].label=="sad"){
            document.getElementById("update_emoji2").innerHTML="&#128542"
        }
        if (r[1].label=="angry"){
            document.getElementById("update_emoji2").innerHTML="&#128545"
        }
    }
}