const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'PLAYER'

const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const ramdomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs:  
    [
      {
        name: "Perfect",
        singer: "Ed Sheeran",
        path: "https://rr4---sn-8pxuuxa-nbozz.googlevideo.com/videoplayback?expire=1716415034&ei=2hVOZrGAD7nc6dsPi-OuuAs&ip=212.102.37.181&id=o-ACDRKCVaXs_mWMT3UVbKdgj6Vp-iySZSnXPvYyrKJK-Z&itag=251&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&bui=AWRWj2QqwcWNN8T27Cy_Ad2PAGRwgZuuFXlgCeRHfAOAM06yl4f2FfpSsNLBzvBGwEtPGb3Sd-R4mx0u&spc=UWF9f4KK3gGgDYMhB2Rna-14VFzJhwzCeNYPiNeCoe_o0Klk04ZzFeWTRRgM&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=Hq4uW_TtIq-9uuRjctKuNGwQ&rqh=1&gir=yes&clen=4502961&dur=263.721&lmt=1676753313405235&keepalive=yes&c=WEB&sefc=1&txp=5532434&n=SbNbQW4R4OZJPw&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIhAJv98xIpF2OOuEFKSWhm_a5k5Wln108EbiK4vWRq7zUZAiBBvjOik8kEZwzkm4aa2ljDbipmDIu8-pVQ1vRHNHOofQ%3D%3D&redirect_counter=1&rm=sn-1giez7z&fexp=24350468,24350476&req_id=3bc07ee87ae9a3ee&cms_redirect=yes&ipbypass=yes&mh=cr&mip=27.64.77.69&mm=31&mn=sn-8pxuuxa-nbozz&ms=au&mt=1716395374&mv=m&mvi=4&pl=21&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AHWaYeowRQIhAJScrtiRUSTDrO1sm56DRSpBPdxsGFUeIGeUCpN5qFJbAiA1Wm81y3NRn__2JEf5NZTgmLvG0T7BnX1HC11nCU1GYA%3D%3D",
        image: "./assets/img/perfect.jpg"
      },
      {
        name: "We Don't Talk Anymore",
        singer: "Charlie Puth x Selena Gomez",
        path: "https://rr4---sn-8pxuuxa-nbo6l.googlevideo.com/videoplayback?expire=1716406012&ei=nPJNZorqH6yD6dsP0su38Ag&ip=89.149.37.157&id=o-AD94oZ0nt7EkWiXmMVhZzutLndjaa_x6RHZVDGWkCryg&itag=251&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&bui=AWRWj2TFhxJvqD96qC7zctftQh-tFAp_XmcdKbWqc807ZSMM3FXqOpXH0du5rslf3W2zhsd1xIQ-05vk&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=kkNh8TX9_Qq58ITFOZj_2RsQ&rqh=1&gir=yes&clen=3700483&dur=217.801&lmt=1708169102419636&keepalive=yes&c=TVHTML5_SIMPLY_EMBEDDED_PLAYER&sefc=1&txp=5532434&n=PrisjyYKKMlD9g&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAMw1NBNxyFrmAQozw1ufBDmacXAuWDuKAuozqyEJgxD8AiEA5slWk1Yi2IJb9kOReu0XW2k3pc6OpLO_kHpIOAvrvJw%3D&rm=sn-n02xgoxufvg3-2gbs7z,sn-2gbey7z&req_id=f481778e6806a3ee&cmsv=e&redirect_counter=2&cms_redirect=yes&ipbypass=yes&mh=vH&mip=27.64.77.69&mm=29&mn=sn-8pxuuxa-nbo6l&ms=rdu&mt=1716395374&mv=m&mvi=4&pcm2cms=yes&pl=21&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pcm2cms,pl&lsig=AHWaYeowRgIhAPSkv2e6uY1RCCj_17lQ65jaMLV489ANwcplR8tk6RtvAiEAzW3-9Y3OXLs8Nc4LpxsiuULZOXkxqkYboP6cbcDb8VI%3D",
        image:
          "./assets/img/weDontTalkAnyMore.jpg"
      },
      {
        name: "Love Someone",
        singer: "Lukas Graham",
        path: "https://rr2---sn-8pxuuxa-i5ozs.googlevideo.com/videoplayback?expire=1716417322&ei=yh5OZqzBBYCC6dsPj_6k-Aw&ip=176.125.229.23&id=o-ANKuugIOptIn6WAvRvsAaLKjajltfcpVrwVe4Uo8dRht&itag=251&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&bui=AWRWj2SRuNPofaXgPf-4mhcsmawc6pIJdM4mcD0BLGICVpbYJmwXExWwK9OKP_m5rksTdvU2LhLK1Lrq&spc=UWF9fwrBMcJZhrEyACo69KVxng10w3ImnFPnaRIoB55KhIIyvz2mjhlqWC_e&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=bO2REv2TFlM6MpD1S--C0JgQ&rqh=1&gir=yes&clen=4019308&dur=237.921&lmt=1714741091231292&keepalive=yes&c=WEB&sefc=1&txp=4502434&n=22vvynyh-TOAlA&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgLae7FRdwyoY6Jt4eKDrwRuyRXBhFQPcbMMzu1TEBKGMCIH6LhytfzSbBqtoK6P27G4_qqwiG6cCWlBTooJozWOEf&redirect_counter=1&rm=sn-4g5ekd7l&req_id=c87d73269bf8a3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=js&mip=27.64.77.69&mm=31&mn=sn-8pxuuxa-i5ozs&ms=au&mt=1716394533&mv=u&mvi=2&pcm2cms=yes&pl=20&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pcm2cms,pl&lsig=AHWaYeowRQIhAJ4HiQJk5Rk1ttshgWOV0Q5jnZS8J0BhlNPcI1obiF7zAiAwZw6X1kAO9TCA_THdCgEZ2HIwlpfhVJZE85Xx7xhN_g%3D%3D",
        image:
          "./assets/img/loveSomeone.jpg"
      },

      {
        name: "See You Again",
        singer: "Wiz Khalifa ft. Charlie Puth",
        path: "https://rr3---sn-8pxuuxa-nbo6l.googlevideo.com/videoplayback?expire=1716414796&ei=7BROZtTuL6nX6dsPn4aP8AI&ip=156.146.60.12&id=o-APb3Icysq_h5FVhgwTSZqrYTP6icpUpuR1FE-ueTtitn&itag=250&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&bui=AWRWj2Qu0gmb_jlr_QnwUWzYx9ielaYzNAqIdOfU0IZswutZxxyw-IoIpT6WqKSp4xw-G3A0dAVI-lL0&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=PkcE_GieMm_Tt0iQAa8gN9UQ&rqh=1&gir=yes&clen=1948849&dur=237.401&lmt=1714633050918864&keepalive=yes&c=TVHTML5_SIMPLY_EMBEDDED_PLAYER&sefc=1&txp=4502434&n=tblXG6JBmpGqYQ&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIhANlP3x2LwybD2S31qMcb7obIPCCnVSruXlbDlEhRQes3AiBJoT4xqgIfu264AmygFXkUaNNdOQG_dNP0PTh1vasgmg%3D%3D&rm=sn-n02xgoxufvg3-2gb67l,sn-2gber7e&req_id=f53a8b75fc9aa3ee&cmsv=e&redirect_counter=2&cms_redirect=yes&ipbypass=yes&mh=96&mip=27.64.77.69&mm=29&mn=sn-8pxuuxa-nbo6l&ms=rdu&mt=1716396070&mv=m&mvi=3&pcm2cms=yes&pl=21&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pcm2cms,pl&lsig=AHWaYeowRQIhAPsG21i4XPZ9Y2ydA1rGHxZxssOTmXlVP9uYPTG-jvDOAiAe5zVmXi9iYoAMVu0eO3kqII6WZ2HXCdxM-U7tNqxpXw%3D%3D",
        image: "./assets/img/seeYouAgain.jpg"
      },
      {
        name: "Marvin Gaye",
        singer: "Charlie Puth",
        path: "https://rr2---sn-8pxuuxa-nbo6s.googlevideo.com/videoplayback?expire=1716417052&ei=vB1OZt_2EtyykucPkf24mAI&ip=38.154.198.172&id=o-APTdWpy7a006T1eHx4xXs6amoW-vgBl1zo7ZIPcrCJgY&itag=251&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&bui=AWRWj2RP45Pb0ZNW-mlP-0xNdu2pckNcIJRUpqOPRQWWegusWVbarQwk2xIr1l_Z91HjggDmkYDnf3Yi&spc=UWF9fwbzce5H8jNahvQgfOHScbcHIOWf6JrO_3REbx_ES50bhMgNHEQpghh6&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=Q2GUh0x7jhZumbULipeLqYcQ&rqh=1&gir=yes&clen=3148601&dur=190.581&lmt=1708171262066889&keepalive=yes&c=WEB&sefc=1&txp=5532434&n=fDILoch9PzPBXw&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhALXsqhITYbA4PXA1gFRDVXgsTXJxFknLm6nQqagwQ8OoAiEAuva08rRrHCTTv9OFNNozDKSl6HLjKhAZ2sfGur5X7Gc%3D&redirect_counter=1&rm=sn-ab5eez7l&req_id=40d0e9e1ce15a3ee&cms_redirect=yes&ipbypass=yes&mh=Zg&mip=27.64.77.69&mm=31&mn=sn-8pxuuxa-nbo6s&ms=au&mt=1716395133&mv=m&mvi=2&pcm2cms=yes&pl=21&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pcm2cms,pl&lsig=AHWaYeowRQIgFxTIKcFr4Xd0ymB7I0DZLjaqQK-bIPlVTLuw0_pwn8ECIQCRo7kM3gg0rUZjLyYdYtsIf9CwHzn43V0DEsg6pnWOdw%3D%3D",
        image:
          "./assets/img/marvinGaye.jpg"
      },
      {
        name: "TỪNG LÀ",
        singer: "TỪNG LÀ",
        path: "https://rr2---sn-8pxuuxa-nbo6r.googlevideo.com/videoplayback?expire=1716417446&ei=Rh9OZvjEG4Oc1d8PrLyFgAc&ip=2402%3A800%3A6310%3Aaf31%3A6184%3A8ca0%3Acf5%3Ad933&id=o-AAk9WRtTRN-5AI0BYOKYGA_4o6hNq0gT0-OBaEBMwQ8H&itag=250&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=CI&mm=31%2C26&mn=sn-8pxuuxa-nbo6r%2Csn-30a7rned&ms=au%2Conr&mv=m&mvi=2&pl=48&gcr=vn&initcwndbps=1232500&bui=AWRWj2R0Mz0GyBP8bpHOp3F4EekWPVoyPu6sstIUfR4m1mi4xa55U6hYPJaNO74wqgKOd77_VTLCob-0&spc=UWF9fzApkfr4wzjHlvLNWu4VO49QsE_tGVyHz3kIogQR0WOelLYUNVQvM4MW&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=7fTgVGv6u_8f3qr0pgkSN40Q&rqh=1&gir=yes&clen=2340160&dur=276.121&lmt=1714782962885657&mt=1716395374&fvip=3&keepalive=yes&c=WEB&sefc=1&txp=4502434&n=Y6QgJ1YUhzmCBA&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cgcr%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AHWaYeowRQIhAMI6JwzHw1N5aM83OFBn1gAwCy-u7KSWUOjWd_nf8U4qAiBFb0o8EjF99Jq-0VvE985WYCG6LvL6_NaE-VxEwENvtQ%3D%3D&sig=AJfQdSswRQIgZVyMRm1UV6i0ehGVWTcBDoHxO2GT2FzeiKbyOjISJ8ECIQCPrGZ1KWlmggLuHbgWWbgv05bXIYLp8LxhCXNUqJWCug%3D%3D",
        image: "./assets/img/tungLa.jpg"
      },
      {
        name: "Thinking Out Loud",
        singer: "Ed Sheeran",
        path: "https://rr1---sn-8pxuuxa-nbo6l.googlevideo.com/videoplayback?expire=1716403485&ei=vehNZu_vH8zwi9oP3sKOgAQ&ip=89.149.37.134&id=o-AK_7nWnTqK6f4fGlEVSv7Qjl2nPapWlNADNy0yTfU4sb&itag=251&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&bui=AWRWj2TyPAEr4TOXIBscuiuS3Y7XYPdamlPE8NAKAVhudQKvp5piaMmX5yNgkZc6_RhPpOLnofv8-Dvm&spc=UWF9fxUDE8JRisPjWORMGmnU7-b01sp2PMtSfOCD6ftq_N0ZP-lZ0NAVnA&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=JkLmRXB0HFc3sg0JOWGDzqkQ&rqh=1&gir=yes&clen=5047065&dur=296.661&lmt=1714824238874985&keepalive=yes&c=WEB_EMBEDDED_PLAYER&sefc=1&txp=4502434&n=-ElvnMWReFF_GA&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAM0EqjZKlKMIeCOt-SS9BGblfl6gAp_O73CGnAvamoa0AiEA_Go_-2J4pgO83zsyfiI4PGS-PVt-1cegJuY688ihO9c%3D&rm=sn-n02xgoxufvg3-2gbz7z,sn-2gber7l&req_id=7bd86044f9ada3ee&cmsv=e&redirect_counter=2&cms_redirect=yes&ipbypass=yes&mh=Ac&mip=27.64.77.69&mm=29&mn=sn-8pxuuxa-nbo6l&ms=rdu&mt=1716395374&mv=m&mvi=1&pl=21&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AHWaYeowRQIhAIxvK3IMhVmQJTleOe9w5gb0f7HvlY8MssYbnpams0ZaAiAzg0kwJ0FUA3Z7qzrmR2WX2yILWASHX-30e2FpLC_6Lg%3D%3D",
        image:
          "./assets/img/thinkingOutLoud.jpg"
      },
      {
        name: "I'm Yours",
        singer: "Jason Mraz",
        path: "https://rr1---sn-8pxuuxa-nbo6s.googlevideo.com/videoplayback?expire=1716413087&ei=Pw5OZvWZNfqF0_wPhPqp8As&ip=191.96.67.204&id=o-ABjDXYgpULxWZTRpj_Q6gRvym-vHzPRNViUfcorH6VQu&itag=251&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&bui=AWRWj2S2ctvyXwupf5LIr8cjZcKLpuX-VaQgnGDTt39zp_oR1BnVQjNE_ouvJA4yuhSXmqIdndZ4Atmb&spc=UWF9fwL0_m9PIwrTHQLzlGHLYSwwdf9B_lBAI8ytacak2QP1iwEddw8wAaWF&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=WBKXbffQo6PmUCsD0L7qI7IQ&rqh=1&gir=yes&clen=3318085&dur=221.801&lmt=1714549750844553&keepalive=yes&c=WEB&sefc=1&txp=4502434&n=sF8JcVlIceEJ4Q&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAKS-CBjvu9L5enwm0ru2h8IEV5yz7gLENZUy51yNs3OxAiEA_eqRy5oEk081n5qN4TMrdXuemZFM-1osqBWfIPpNZtc%3D&redirect_counter=1&rm=sn-q4feey7s&req_id=594645c52a05a3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=sj&mip=27.64.77.69&mm=31&mn=sn-8pxuuxa-nbo6s&ms=au&mt=1716396072&mv=m&mvi=1&pl=21&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AHWaYeowRgIhAK6PFBIL7NjOaYph54mtqwVmambGuXm8ZEdf06HyePzyAiEAzvRn9Ekdb-2ko7AvxXqXNZPeqqtoXIfX37bGs6S-_s8%3D",
        image:
          "./assets/img/imyours.png"
      },
      {
        name: "7 Years",
        singer: "Lukas Graham",
        path: "https://rr3---sn-8pxuuxa-nboss.googlevideo.com/videoplayback?expire=1716406036&ei=tPJNZqawF_W66dsPhbqo0AI&ip=176.125.229.10&id=o-AL4kcM0KrMYWuOHgACWyaHG4cuOWQgAfdpE-ldj_NvHo&itag=251&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&bui=AWRWj2TlfhSXYOQMSUc13H5JadZk54uu46zTW0d2wZ0SG_RIyb7FolTXeJs9QPW2e3P30ZB1csTkT6E8&spc=UWF9f7YN2BR1-Icjp97ryWLdtbXmuqYsvFda9lMdGwGzMZ3X7TJgONWOVaut&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=mRj39TuecgmlT4nyrRBzRgUQ&rqh=1&gir=yes&clen=4105704&dur=233.801&lmt=1715946436858921&keepalive=yes&c=WEB&sefc=1&txp=4532434&n=JzJCNpRDc-YOKA&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgfXCC1-kFsTy8wr6J20Dmf70Qft74khR9qGU9jdxVnJsCIAmJuEXZm6-ETLThvwt9y2eugoyzHwsJKBygPWwPpNle&rm=sn-nvm-cxbz7l,sn-4g5eks7s&req_id=16f8921a4282a3ee&redirect_counter=2&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=_4&mip=27.64.77.69&mm=29&mn=sn-8pxuuxa-nboss&ms=rdu&mt=1716396354&mv=u&mvi=3&pl=21&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AHWaYeowRQIgMQherqlrfxfv2XbKMsiEZrsVsR4sau5inAs0CtrGYnMCIQDh8BVzg_mzW3Vep7LRci38vv6ECgl416VM4xRWvHXmCQ%3D%3D",
        image:
          "./assets/img/7years.jpg"
      }
    ],
    setConfig: function(key, value) {
        this.config[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    render: function () {
        const htmls = this.songs.map((song, index) => {
        return `
          <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
        `
      })
      
      playlist.innerHTML = htmls.join("");
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function() {
        const _this = this
        const cd = $('.cd')
        const cdWidth = cd.offsetWidth

        // Handle CD rotate
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)'}
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause()

        // Zoom in and zoom out CD
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth -scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0 
            cd.style.opacity = newCdWidth / cdWidth
        }

        // Play click 
        playBtn.onclick = function() {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        //Playing song
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        } 

        //Pausing song
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        } 

        // seek bar change 
        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progessPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progessPercent
            }
            console.log(audio.currentTime / audio.duration * 100)
        }

        // handle for seek 
        progress.onchange = function(e) {
            console.log(e.target.value)
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }

        // Next song
        nextBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        // Previous song
        prevBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
            _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        // random
        ramdomBtn.onclick = function(e) {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            ramdomBtn.classList.toggle('active', _this.isRandom)
        }

        // handle repeat song 
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }

        // Handle next when audio ended
        audio.onended = function() {
            if (_this.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }

        // list click into play list
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)')
            if ( songNode || e.target.closest('.option') ) {
                    if (songNode) {
                        _this.currentIndex = Number(songNode.dataset.index)
                        _this.loadCurrentSong()
                        audio.play()
                        _this.render()
                    }
                }            
        }
    },
    scrollToActiveSong: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            })
        }, 300)
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    loadConfig: function() {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },
    nextSong: function() {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length - 1) {
            this.currentIndex = 0
        }

        this.loadCurrentSong()
    },
    prevSong: function() {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1 
        }
        this.loadCurrentSong()
    },
    playRandomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)

        this.currentIndex = newIndex
        console.log(newIndex)
        this.loadCurrentSong()

    },
    start: function() {
        // Load config
        this.loadConfig()

        // define properties for object 
        this.defineProperties()

        // listen and handle events - Dom events
        this.handleEvents()

        // load current song into UI
        this.loadCurrentSong()

        // render playlist
        this.render()


        // Show initial state of button repeat & random
        ramdomBtn.classList.toggle('active', this.isRandom)
        repeatBtn.classList.toggle('active', this.isRepeat)
    }
  }

    app.start()