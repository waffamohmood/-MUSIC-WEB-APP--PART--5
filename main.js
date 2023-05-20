dancemonkey="";
stealmygirl="";
leftWristx=0;
leftWristy=0;
rightWristx=0;
rightWristy=0;
scoreLeftWrist=0;
songdancemonkey="";
scoreRightWrist=0;
songstealmygirl="";

function preload(){
    dancemonkey=loadSound("dancemonkey.mp3");
    stealmygirl=loadSound("stealmygirl.mp3");
}
function setup(){
    canvas=createCanvas(500,600);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotposes);
}
function gotposes(results){
    if (results.length> 0){
       console.log(results);
       scoreLeftWrist=results[0].pose.keypoints[9].score;
       console.log("scoreLeftWrist"+scoreLeftWrist);
       scoreRightWrist=results[0].keypoint[10].score;
       console.log("scoreRightWrist"+scoreRightWrist);

       leftWristx=results[0].pose.leftWrist.x;
       leftWristy=results[0].pose.leftWrist.y;
       console.log("Leftwrist X = "+leftWristx +"Leftwrist Y = "+leftWristy);

       rightWristx=results[0].pose.rightWrist.x;
       rightWristy=results[0].pose.rightWrist.y;
       console.log("Rightwrist X = "+rightWristx +"Rightwrist Y = "+rightWristy);
   }
}
function modelLoaded(){
    console.log("Posenet Is Initailize");
}
function draw(){
    image(video,0,0,600,500);
    fill("#8dbcf2");
    stroke("#000308");

    songstealmygirl=stealmygirl.isPlaying();
    console.log("song steal my girl "+songstealmygirl)
    if(scoreRightWrist >0.2){
      circle(rightWristx,rightWristy,20);
      dancemonkey.stop();
      if(rightWrist == false){
        stealmygirl.play();
      }
      else{
        document.getElementById("songnameid").innerHTML="Song name = Steal my girl";
      }
    }

    songdancemonkey=dancemonkey.isPlaying();
    console.log("song dance monkey "+songdancemonkey);
    if(scoreleftWrist > 0.2){
      circle(leftWristx,leftWristy,20);
      stealmygirl.stop();
      if(leftWist == false){
        dancemonkey.play();
      }
      else{
        document.getElementById("songnameid").innerHTML="Song name = Dance Monkey";
      }
    }
}