<template>
    <div class="jumpbotron">
        <div class="jumpbotron-area p-5 mb-4 text-bg-secondary rounded-3">
            <div class="container-fluid text-center p-5">
                <div class="row">
                    <div class="col">
                        <img src="https://api.romens.org/images/GeekPortal/logo_long2.png" class="img-fluid p-3" :title="name"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <p class="fs-2 text-outline">{{description}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .jumpbotron-area {
        box-shadow: inset gray 0px 0px 60px -12px;
        //background: linear-gradient(90deg, rgb(64, 64, 215) 0%, rgba(0,212,255,1) 100%);
    }
    .jumpbotron-area .display-5 {
        font-variant: all-small-caps;
    }
    .text-outline {
        color: white;
        text-shadow: 0px 0px 10px rgba(0,0,0,0.5);
    }
</style>
<script>
    const
        STYLE = document.createElement('style'),
        MIN_SAT = 50,
        MIN_LIGHT = 20,
        MAX_LIGHT = 80,
        ANI_LENGTH = 300,
        ANI_PAUSE = 1000;
    document.head.prepend(STYLE);

    let
        c0 = [], p_c0,
        c1 = [], p_c1,
        c2 = [], p_c2,
        c3 = [], p_c3,
        d0,  p_d0,
        d1,  p_d1,
        ang, p_ang;
    function setGradient() {
        p_c0  = [c0[0], c0[1], c0[2]];
        p_c1  = [c1[0], c1[1], c1[2]];
        p_c2  = [c2[0], c2[1], c2[2]];
        p_c3  = [c3[0], c3[1], c3[2]];
        p_d0  = d0;
        p_d1  = d1;
        p_ang = ang;
        c0  = randColor();
        c1  = randColor();
        c2  = randColor();
        c3  = randColor();
        d0  = rand(45, 10);
        d1  = rand(55, 90);
        ang = rand(0, 180);
    }

    function loop(step) {
        if (step === 0) {
            setGradient();
        }

        const FRAME = step / ANI_LENGTH;
        STYLE.innerHTML = `
        .jumpbotron-area {
          background: linear-gradient(
            ${interp(p_ang, ang, FRAME, true)}deg,
            ${getHslString(interp(p_c0, c0, FRAME))},
            ${getHslString(interp(p_c1, c1, FRAME))}
            ${interp(p_d0, d0, FRAME, true)}%,
            ${getHslString(interp(p_c2, c2, FRAME))}
            ${interp(p_d1, d1, FRAME, true)}%,
            ${getHslString(interp(p_c3, c3, FRAME))}
          );
        }
      `;

        setTimeout(
            () => window.requestAnimationFrame(
                loop.bind(this, (step + 1) % ANI_LENGTH)
            ),
            step === ANI_LENGTH - 1 ? ANI_PAUSE : 0
        )
    }

    function rand(max, min = 0) {
        return Math.floor(min + (Math.random() * (max - min)));
    }

    function randColor() {
        return [
            rand(256),
            rand(100, MIN_SAT),
            rand(MAX_LIGHT, MIN_LIGHT)
        ];
    }

    function interp(prev, next, frame, frac) {
        if (typeof prev === 'number') {
            frame = (Math.cos(Math.PI * frame) - 1) * -0.5;
            const value = prev + ((next - prev) * frame);
            return frac ? value : Math.floor(value);
        }
        return prev.map((p, i) => interp(p, next[i], frame, frac));
    }

    function getHslString(color) {
        color = color.map((c, i) => c.toString().padStart(i ? 2 : 3, ' '));
        return `hsl(${color[0]}, ${color[1]}%, ${color[2]}%)`;
    }

    setGradient();
    loop(0);
</script>
<script setup>

const {avatar, name, description} = defineProps(['avatar', 'name', 'description']);

</script>