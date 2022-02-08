//https://teachablemachine.withgoogle.com/models/HJN6ErY1H/

Webcam.set({
    Width:350,
    Height:300,
    image_format: "png",
    png_quality: 90

});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){

        document.getElementById("result").innerHTML = '<img id= captured image src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/HJN6ErY1H/model.json', modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data1 = "The first prediction is " + prediction_1;
    speak_data2 = "The second prediction is " + prediction_2;
    
    var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}



function gotResult(error, result) {
if (error) {
    console.error(error)
} else {
   console.log(result);
   document.getElementById("result_gesture_name1").innerHTML = results[0].label;
   document.getElementById("result_gesture_name2").innerHTML = results[1].label; 
   prediction_1 = results[0].label;
   prediction_2 = results[1].label;
   speak();
   if (results[0].label == "amazing") {
       document.getElementById("update_gesture1").innerHTML = "&#128076;";
   }

   if (results[0].label == "victory") {
    document.getElementById("update_gesture1").innerHTML = "&#9996;";
}

if (results[0].label == "best") {
    document.getElementById("update_gesture1").innerHTML = "&#128077;";
}

if (results[1].label == "amazing") {
    document.getElementById("update_gesture2").innerHTML = "&#128076;";
}

if (results[1].label == "victory") {
 document.getElementById("update_gesture2").innerHTML = "&#9996;";
}

if (results[1].label == "best") {
 document.getElementById("update_gesture2").innerHTML = "&#128077;";
}



}

}