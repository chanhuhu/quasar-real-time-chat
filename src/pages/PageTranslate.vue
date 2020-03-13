<template>
  <q-page class="flex column">
    <div class="q-pa-md column col">
      <q-form>
        <q-input
          class="q-mb-sm"
          type="text"
          id="text"
          label="ประโยค"
          v-model="text"
        ></q-input>
        <q-select
          v-model="selectTranslate"
          :options="options"
          label="เลือกภาษา" />
        <div class="test q-mt-sm full-width" id="test" name="test"></div>
        <div class="flex row">
          <q-space></q-space>
          <q-btn
            color="primary"
            @click="tran"
            class="q-mt-sm">Translate</q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
    export default {
        name: 'PageTranslate',
        data: () => ({
            selectTranslate:"",
            text:"",
            text2:"",
            options: [
                'ไทย', 'อังกฤษ',
            ]
        }),
        methods: {
            translate(sentences, targetDiv, from_lang, to_lang) {
                console.log(targetDiv);
                sentences = sentences.replace(/\n/g, '<br>');
                let endPoint = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from_lang}&tl=${to_lang}&dt=t&ie=UTF-8&oe=UTF-8&q=${encodeURIComponent(sentences)}`;
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status === 200) {
                        var jsonText = JSON.parse(this.responseText);
                        var text = jsonText[0][0][0];
                        text = text.replace(/<br>/g, '\n');
                        console.log(text)
                        targetDiv.innerHTML = "&nbsp;" + text;
                    }
                };
                xhttp.open("GET", endPoint, true);
                xhttp.send();
            },
            tran() {
                let element = document.getElementById("test")
                console.log(element)
                if (this.selectTranslate === 'ไทย'){
                    this.translate(this.text, element, 'en', 'th');
                }else if (this.selectTranslate === 'อังกฤษ'){
                    this.translate(this.text, element, 'th', 'en');
                }
            }
        }
    }

</script>

<style>
  .test {
    height: 3rem;
    border: dashed;
    justify-self: center;
  }
</style>
