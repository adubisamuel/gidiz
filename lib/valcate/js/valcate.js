window.vv = {};

//Definitions
vv = {
     urls : { cdn : '/CDN'},
     intervals : {
          countDown : [],
          slider : []
     },
     floatVideo : {
          current : "",
          src : "",
     }
};

//DB
vv.dataBase = (data) => {
     let action = data.action;
     let content = data.content;
     let state = data.state;
     let key = data.key;

     let sessData = JSON.parse(sessionStorage.getItem('vvDB'));
     let locData = JSON.parse(localStorage.getItem('vvDB'));

     let pulledData;

     //Save Item
     if(action === 'save'){

     }

     //Get
     if(action === "get"){
          let resp = {
               status : 1,
               data : {}
          }

          if(state == 0){
               resp.data = sessData[key];
          }else{
               resp.data = locData[key];
          }
          pulledData = resp;
     }

     console.log('DB Loaded');
     return pulledData;
}

//Create DB OF Local and sessionStorage
(function(){
     //Create DB
     sessionStorage.setItem('vvDB', "{}");
     localStorage.setItem('vvDB', "{}");
}());


//Resize
window.addEventListener('resize', () => {
     vvComponentsObserver('resize');
})

//Before Page Load
document.addEventListener("DOMContentLoaded", () => {
     //Create Space for loading Libaries
     let vvCSSElm = document.createElement('div');
     vvCSSElm.id = "vv-libs-css";
     document.body.prepend(vvCSSElm);

     let vvJSElm = document.createElement('div');
     vvJSElm.id = "vv-libs-js";
     document.body.appendChild(vvJSElm);

     // console.log(document.getElementById('pageBase'));
     fetch(`${vv.urls.cdn}/data/3193278326g327gu328723.json`,
          {
               method : 'GET',
          })
          .then((x) => {
               return x.json();
          })
          .then((resp) => {
               //Keep Data in Browser for Usage later
               sessionStorage.setItem('vvDB', JSON.stringify(resp));

               //Mount Libraries
               for(let key in resp.libraries){
                    vvLoadLibrary(resp.libraries[key]);
               }

          })
          .catch( (err) => {
               console.log(err);
          });
});


//On Load Function
window.document.body.onload = () => {
     // console.log('Loaded--------------');
     setTimeout(() => {
          vvObserver.disconnect();
     }, 1000)

     //Fetch Data

     let app = document.createElement('script');
     app.src = '/assets/js/valcate-view-app.js';
     document.body.appendChild(app);
}

// window.onload = () => {
//      console.log("All is loaded");
// }


//Mutation Observer runs through the page on changes detected
const vvObserver = new MutationObserver(targ => {
     // console.log('tracking');
     // console.log(targ);
     vvComponentsObserver();
     // //Tabs
     // if(document.querySelectorAll('.vv-tab').length > 0){
     // }
});

vvObserver.observe(document.body, {childList: true});

// Tabs
const vvComponentsObserver = (action = 'load') => {
     vvClearAllIntervals();

     //Video Manager
     let vVideos = document.querySelectorAll('vv-video');
     vVideos.forEach(video => {

     })

     //Tabs ------------------------------------------------------------------------------------------------
     let vvTabHolder = document.querySelectorAll('.vv-tab');

     vvTabHolder.forEach( tabHolder => {
          if(!tabHolder.classList.contains('vvTabActive')){
               let tabs = tabHolder.querySelectorAll('.vv-tab-head li.tab');
               let tabPage = tabHolder.querySelectorAll('.vv-tab-body li.tab');

               // console.log(tabs.length);

               for(let i = 0; i < tabs.length; i++){
                    // console.log(i);
                    let currentTab = tabs[i];
                    let thereIsActive = -1;

                    if(currentTab.classList.contains('active')){
                         thereIsActive = i;
                    }

                    //Check for Active else set active
                    // console.log((tabs.length - 1));

                    if(i === (tabs.length - 1)){
                         // console.log(thereIsActive);
                         if(thereIsActive == -1){
                              tabs[0].classList.add('active');
                              tabPage[0].style.display = 'block';
                         }else{
                              tabPage[thereIsActive].style.display = 'block';
                         }
                    }

                    //Click Event to ensure users can click
                    currentTab.addEventListener('click', e => {
                         if(!currentTab.classList.contains('active')){
                              // console.log(tabPage[i]);
                              //Show New Tab Page
                              tabPage.forEach(t => {
                                   t.style.display = 'none';
                              })
                              tabPage[i].style.display = 'block';

                              //Change Tab
                              tabs.forEach(t => {
                                   t.classList.remove('active');
                              })
                              currentTab.classList.add('active');
                         }
                    })

               }

               //Protect Tab from running action again
               tabHolder.classList.add('vvTabActive');
          }
     } )

     //Slider -------------------------------------------------------------------------------------------
     let vvSlider = document.querySelectorAll('.vv-slider');
     // console.log(vvSlider);
     let sliderCnt = 0;
     vvSlider.forEach(slider => {
          // console.log(vvSlider);
          sliderCnt++;
          if(!slider.classList.contains('vvSliderActive') || action == 'resize'){
               slider.dataset.name=`vvSlider-${sliderCnt}`
               slider.style.display = 'block';
               slider.style.position = 'relative';
               let parent = slider.parentElement;

               slider.style.width = parent.offsetWidth + 'px';
               slider.style.height = parent.offsetHeight + 'px';

               let slides = slider.querySelectorAll('.slide');



               //Add the Cusor Controller
               // let fullController = document.createElement('div');
               //      fullController.style.height = '100%';
               //      fullController.style.width = '100%';
               //      fullController.style.position = 'absolute';
               //      fullController.style.zIndex = (slides.length + 20);
               //      fullController.style.display = 'flex';
               //      fullController.style.flexDirection = 'columns';
               //
               //      fullController.style.background = '#FC0';
               //
               //      slider.prepend(fullController);

               //Add Side Control buttons
               let lftControl = document.createElement('div');
                    // lftControl.style.height = '70px';
                    // lftControl.style.width = '70px';
                    lftControl.style.padding = '10px 15px 4px 10px';
                    lftControl.style.position = 'absolute';
                    lftControl.style.top = 'calc( 50% - 27px )';
                    lftControl.style.zIndex = (slides.length + 20);
                    lftControl.style.cursor = `pointer`;
                    lftControl.style.background = '#FFF';
                    lftControl.style.opacity = 0.5;

                    slider.prepend(lftControl);

                         //Left Image
                         let leftImg = document.createElement('img');
                              leftImg.src = `${vv.urls.cdn}/media/slider_prev.png`;
                              leftImg.height = 20;
                              lftControl.appendChild(leftImg);



               let rgtControl = document.createElement('div');
                    // rgtControl.style.height = '70px';
                    // rgtControl.style.width = '70px';
                    rgtControl.style.padding = '10px 10px 4px 15px';
                    rgtControl.style.position = 'absolute';
                    rgtControl.style.zIndex = (slides.length + 20);
                    rgtControl.style.top = 'calc( 50% - 27px )';
                    rgtControl.style.right = 0;
                    rgtControl.style.cursor = `pointer`;
                    rgtControl.style.background = '#FFF';
                    rgtControl.style.opacity = 0.5;

                    slider.prepend(rgtControl);

                         //Right Image
                         let rightImg = document.createElement('img');
                              rightImg.src = `${vv.urls.cdn}/media/slider_next.png`;
                              rightImg.height = 20;
                              rgtControl.appendChild(rightImg);



               //Init Slides
               let attr = slider.dataset;

               //Timer
               if(!attr.hasOwnProperty("timeout")){
                    attr.timeout = 5000;
               }

               //Action
               if(!attr.hasOwnProperty("autoplay")){
                    attr.autoplay = false;
               }

               //Effect
               if(!attr.hasOwnProperty("effect")){
                    attr.effect = 'fade';
               }

               // console.log(Clappr);




               //Give Effect to the Slides
               for(let i = 0; i < slides.length; i++) {
                    let slide = slides[i];

                    let slideData = slide.dataset;

                    slideData.id = (slides.length - i);

                    // slide.style.zIndex = (slides.length - i);
                    slideData.id = (slides.length - i);

                    // slide.style.width = slider.offsetWidth + 'px';
                    slide.style.width = '100%';
                    // slide.style.height = slider.offsetHeight + 'px';
                    slide.style.height = '100%';

                    if(!slideData.hasOwnProperty('time')){
                         slide.dataset.time = attr.timeout;
                    }

                    if(slideData.hasOwnProperty('type') && slideData.type == 'video'){
                         // alert('Here now');
                         let id = `video-slide-${(slides.length - i)}`;
                         let videoPlayer = document.createElement('div');
                              videoPlayer.style.height = '100%';
                              videoPlayer.style.width = '100%';
                              videoPlayer.id = id;
                              // videoPlayer.classList.add('amber');

                         slide.prepend(videoPlayer);
                         // alert(slideData.src);

                         //Add Video Player
                         new Clappr.Player({
                              parentId : `#${id}`,
                              source : slideData.src,
                              width : '100%',
                              height : '100%',
                              // autoPlay : true,
                              // loop: true,
                              mediacontrol: {seekbar: "#F00", buttons: "#FFF"},
                              exitFullscreenOnEnd : true,
                              poster : slideData.poster,
                              events : {
                                   // onPlay : pauseCurrentSlider(),
                                   // onEnded : playCurrentSlider(),
                              }
                         });
                    }
               }


               // console.log(typeof attr.autoplay);
               if(attr.autoplay === 'true'){
                    vvSliderAutoPlay(slider);
               }
               slider.classList.add('vvSliderActive');
          }
     })

     //CountDown Timer -------------------------------------------------------------------------------------
     let vvCountDown = document.querySelectorAll('.vv-countdown');
     vvCountDown.forEach(countDown => {
          // if(!countDown.classList.contains('vvCountDownActive')){
               let targetDate = new Date(countDown.dataset.targetTime).getTime();
               let targetLaunch = countDown.dataset.end;
               let theme = countDown.dataset.theme;
               // console.log(countDown.style);
               //Add Theme
               countDown.classList.add(theme);
               countDown.classList.add('vvCountDownActive');

               // countDown.style.background = `url(${vv.urls.cdn}/media/${countDown.dataset.background}`;
               // countDown.style.backgroundSize = 'cover';

               window.vv.intervals.countDown.push(setInterval( () => {
                    let nowTime = new Date();
                    let diff = targetDate - nowTime;

                    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    let seconds = Math.floor((diff % (1000 * 60)) / 1000);

                    if(days < 10){
                         days = '0'+days;
                    }
                    if(hours < 10){
                         hours = '0'+hours;
                    }
                    if(minutes < 10){
                         minutes = '0'+minutes;
                    }
                    if(seconds < 10){
                         seconds = '0'+seconds;
                    }


                    countDown.innerHTML = `<div class="vvCountDownHolder">
                         <div class="time days">
                              <span class="cnt">${days}</span>
                              <span>day(s)</span>
                         </div>
                         <div class="time hours">
                              <span class="cnt">${hours}</span>
                              <span>hour(s)</span>
                         </div>
                         <div class="time minutes">
                              <span class="cnt">${minutes}</span>
                              <span>min(s)</span>
                         </div>
                         <div class="time seconds">
                              <span class="cnt">${seconds}</span>
                              <span>sec(s)</span>
                         </div>
                    </div>`;

                    // console.log(minutes);
                    // console.log(seconds);

               }, 1000 ));

          // }
     });

     //Float Video -------------------------------------------------------------------------------------------
     let vvFloatVideo = document.querySelectorAll('.vv-float-video');

     if(vvFloatVideo.length === 0){

          vvFloatVideoBox = document.createElement('div');

          vvFloatVideoBox.classList.add('draggable');
          vvFloatVideoBox.classList.add('resizable');
          vvFloatVideoBox.classList.add('vv-float-video');
          document.getElementById('valcateView').prepend(vvFloatVideoBox);
          // console.log(vvFloatVideoBox);

     }
}

//Slider Function
const vvSliderAutoPlay = (slider) => {
     // console.log(slider);

     // console.log(slider.offsetWidth);
     let sliderWidth = slider.offsetWidth;
     let sliderHeight = slider.offsetHeight;

     let slidesCnt = 0;
     let slidesCntPlus = 0;
     let myZIndex = 0;

     sliderRotate();

     function sliderRotate(){
          let slides = slider.querySelectorAll('.slide');

          let currentSlide = slides[slidesCnt];
          let props = currentSlide.parentNode.dataset;
          let dataSet = currentSlide.dataset;

          // console.log('------------------------');
          // console.log(slidesCnt);
          // console.log(currentSlide.dataset);
          // console.log('------------------------');

          myZIndex = currentSlide.dataset.id;

          // currentSlide.style.zIndex = (Number(slides.length) + 10);

          if(dataSet.hasOwnProperty('type')){

               if(dataSet.type === 'video'){
                    //dataSet.id

               }


          }else{
               makeSlide();
          }

          function makeSlide(){

               let timeOut = setTimeout(() => {
                    let animate, endAnimation = {};
                    currentSlide.style.position = 'absolute';

                    if(props['effect'] == 'swipe'){
                         // currentSlide.style.zIndex = 10;
                         animate = {
                              'margin-left' : -Math.abs(sliderWidth) + 'px'
                         };

                    }

                    if(props['effect'] == 'fade'){
                         animate = {
                              'opacity' : 0,
                         };
                    }

                    if(props['effect'] == 'slideUp'){
                         animate = {
                              'margin-top' : -Math.abs(sliderHeight) + 'px'
                         };
                    }

                    if(props['effect'] == 'slideDown'){
                         animate = {
                              'margin-top' : Math.abs(sliderHeight) + 'px'
                         };
                    }


                    $(currentSlide)
                         .animate(
                              animate,
                         1000,
                         () => {

                              clearTimeout(timeOut);

                              let xSlide = currentSlide;

                              currentSlide.style.position = '';
                              currentSlide.outerHTML = '';
                              slider.appendChild(xSlide);

                              if(props['effect'] == 'swipe'){
                                   xSlide.style.marginLeft = 0;
                              }

                              if(props['effect'] == 'fade'){
                                   xSlide.style.opacity = 1;
                              }

                              if(props['effect'] == 'slideUp' || props['effect'] == 'slideDown'){
                                   xSlide.style.marginTop = 0;
                              }


                              $(currentSlide).css(endAnimation);
                              sliderRotate();
                         })

               }, Number(currentSlide.dataset.time));

          }

     }

}


//Load Library
const vvLoadLibrary = (data) => {
     // console.log(data);
     // console.log(typeof data);
     for(let src in data){
          let script = data[src];
          // console.log(src);
          //Load CSS
          if(src.includes('css')){
               let cssHolder = document.getElementById('vv-libs-css');
               let cssFile = document.createElement('link');
               cssFile.rel = 'stylesheet';
               // rel.media = "screen";
               if(!script.includes('http')){
                    script = `${window.vv.urls.cdn}${script}`;
               }

               cssFile.href = script;
               // console.log(cssHolder);
               cssHolder.appendChild(cssFile);
          }

          //Load Javascript
          if(src.includes('js')){
               let jsHolder = document.getElementById('vv-libs-js');
               let jsFile = document.createElement('script');

               if(!script.includes('http')){
                    script = `${window.vv.urls.cdn}${script}`;
               }

               jsFile.src = script;
               jsHolder.appendChild(jsFile);
          }
     }
}


//Clear All Intervals
const vvClearAllIntervals = () => {
     let intervals = vv.intervals;

     for(let key in intervals){
          intervals[key].forEach(fnc => {
               window.clearInterval(fnc);
          });

          intervals[key] = [];
     }
}

//Events Body
document.addEventListener('click', elm => {

     //Show Modal
     if(elm.target.classList.contains('vv-call-modal') || elm.target.parentNode.classList.contains('vv-call-modal')){
          let target = elm.target;

          let modal = document.querySelector('.vv-modal-shade');
          let title = target.dataset.title;

          document.querySelector('.vv-modal-title').innerHTML = title;

          if(target.classList.contains('vv-call-lg')){
               document.querySelector('.vv-modal').classList.add('vv-modal-lg');
          }
          if(target.classList.contains('vv-call-sm')){
               document.querySelector('.vv-modal').classList.add('vv-modal-sm');
          }

          vvFadeIn(modal);
     }
     //CLose Modal
     if(elm.target.classList.contains('vv-modal-close')){
          let target = elm.target;
          let modal = target.parentNode.parentNode.parentNode;
          vvFadeOut(modal);
          setTimeout(() => {
               document.querySelector('.vv-modal').classList.remove('vv-modal-lg');
               document.querySelector('.vv-modal').classList.remove('vv-modal-sm');
          }, 300);
     }


})

//FadeOut
const vvFadeOut = (elm) => {
     elm.classList.add('fade-out');
     setTimeout(() => {
          elm.classList.remove('fade-out');
          elm.style.display = 'none';
     }, 300)
}
// fadeIn
const vvFadeIn = (elm) => {

     elm.style.display = 'block';

     if(elm.classList.contains('vv-modal-shade')){
          elm.style.display = 'flex';
     }

     elm.classList.add('fade-in');
     setTimeout(() => {
          elm.classList.remove('fade-in');
     }, 300)
}

//Float Video Player Function
const vvFloatVideo = (videosrc, type) => {
     videosrc = document.querySelector(videosrc);
     // console.log(videosrc);
     let vvFloatVideo = document.querySelector('.vv-float-video');

     // vvFloatVideo.classList.add = 'ui-widget-content';
     vvFloatVideo.classList.add = 'draggable';

     vvFloatVideo.style.display = 'block';
     vvFloatVideo.style.display = 'relative';

     vvFloatVideo.innerHTML = videosrc.innerHTML;
     // console.log(videosrc.innerHTML);
     vvFloatVideo.style.background = '#FFF';
     // vvFloatVideo.style.padding = '10px';

     // vvFloatVideo.classList.add('draggable');
     // vvFloatVideo.classList.add('resizable');
     //Dragger
     let dragVideo = document.createElement('i');
     dragVideo.classList.add('icofont-drag');
     // dragVideo.classList.add('ui-widget-header');
     dragVideo.classList.add('white-text');
     dragVideo.style.fontSize = '25px';
     dragVideo.style.cursor = 'pointer';
     dragVideo.style.position = 'absolute';
     dragVideo.style.right = '5px';
     dragVideo.style.bottom = '5px';
     dragVideo.style.padding = '10px';
     dragVideo.title = 'Hold and Drag';
     vvFloatVideo.prepend(dragVideo);

     $('.draggable').draggable({ handle: ".icofont-drag", containment : 'parent' });




     let closeVideo = document.createElement('i');
     closeVideo.classList.add('icofont-close-line');
     closeVideo.classList.add('white-text');
     closeVideo.style.fontSize = '20px';
     closeVideo.style.position = 'absolute';
     closeVideo.style.right = '5px';
     closeVideo.style.top = '5px';
     closeVideo.style.padding = '10px';

     vvFloatVideo.prepend(closeVideo);
     closeVideo.addEventListener('click', () => {
          vvFloatVideoClose();
     })

     videosrc.innerHTML = '<h3 class="left full tcenter black padd10 white-text">Video Now Playing in Floating Box</div>';

     vv.floatVideo.current = videosrc.innerHTML;
     vv.floatVideo.src = videosrc;

}
     const vvFloatVideoClose = () => {
          let vvFloatVideo = document.querySelector('.vv-float-video');
          vvFloatVideo.style.display = 'none';
          vvFloatVideo.innerHTML = '';

          // vv.floatVideo.src
     }