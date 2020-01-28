//Selectors
const player=document.querySelector('.player');
const video=player.querySelector('.viewer');
const progress=player.querySelector('.progress');
const progressBar=player.querySelector('.progress__filled');
const toggle=player.querySelector('.toggle');
const skip=player.querySelectorAll('[data-skip]');
const ranges=player.querySelectorAll('.player__slider');

//functions
function togglePlay(){
    if(video.paused){
        video.play();
    }
    else{
        video.pause();
    }
    //const method=video.paused?'play':'pause'
    //video[method]()
}
function togglePlayButton(){
    toggle.textContent=this.paused? '►' : '❚ ❚';
}
function videoSkip(){
    //this.dataset.skip holds the value to skip
    video.currentTime+=parseFloat(this.dataset.skip);
}
function handleRangeUpdate(){
    //console.log(this.value);
  
    video[this.name] = this.value;
}
function progressUpdate(){
    const percent=(video.currentTime/video.duration)*100;
    progressBar.style.flexBasis=`${percent}%`;
}
function scrub(e){
    const scrubTime=(e.offsetX/progress.offsetWidth)*video.duration;
    video.currentTime=scrubTime;
}
//event listeners
video.addEventListener('click',togglePlay);
video.addEventListener('play',togglePlayButton);
video.addEventListener('pause',togglePlayButton);
toggle.addEventListener('click',togglePlay);
skip.forEach(button=>button.addEventListener('click',videoSkip));
ranges.forEach(range=>range.addEventListener('change',handleRangeUpdate));
video.addEventListener('timeupdate',progressUpdate);
progress.addEventListener('click',scrub);
let mouseDown=false;
progress.addEventListener('mousedown',()=>mouseDown=true);
progress.addEventListener('mouseup',()=>mouseDown=false);
//progress.addEventListener('mousemove',(e)=>mouseDown && scrub(e)); //eq to if(mouseDown) scrub()
progress.addEventListener('mousemove',(e)=>{
    if(mouseDown){
        scrub(e);
    }
});  