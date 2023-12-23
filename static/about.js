gsap.registerPlugin(ScrollTrigger);


gsap.to(".card-1",{
    scrollTrigger:{
        trigger:".card-1",
        start:"top 50%",
        end:"bottom 50%",
        toggleClass:"card-animate",
        toggleActions: "restart reverse none none", 

    }
})


gsap.to(".card-2",{
    scrollTrigger:{
        trigger:".card-2",
        start:"top 50%",
        end:"bottom 50%",
        toggleClass:"card-animate",
        toggleActions: "restart reverse none none", 

    }
})

gsap.to(".card-3",{
    scrollTrigger:{
        trigger:".card-3",
        start:"top 50%",
        end:"bottom 50%",
        toggleClass:"card-animate",
        toggleActions: "restart reverse none none", 

    }
})

gsap.to(".card-4",{
    scrollTrigger:{
        trigger:".card-4",
        start:"top 50%",
        end:"bottom 50%",
        toggleClass:"card-animate",
        toggleActions: "restart reverse none none", 

    }
})

gsap.to(".card-5",{
    scrollTrigger:{
        trigger:".card-5",
        start:"top 50%",
        end:"bottom 50%",
        toggleClass:"card-animate",
        toggleActions: "restart reverse none none", 

    }
})

gsap.to(".loaded", {
    scrollTrigger: {
      trigger: ".card-container",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const progress = self.progress.toFixed(2);
        const backgroundSize = `${progress * 100}% 100%`;
        gsap.to(".loaded", { backgroundSize: backgroundSize });
      },
    },
  })

