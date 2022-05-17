<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <transition name="slide-fade">
            <v-card outlined v-if="showCard">
            <v-card-title><h2 class="text-h3">Alfa Laurel</h2> </v-card-title>
            <v-card-subtitle>  <p class="text-body-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro, sit?</p></v-card-subtitle>
            <v-card-text>
              <v-form ref="form">
                <v-container>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                          :rules="[rules.required]"
                          filled
                          outlined
                          v-model="examRequest.student_name"
                          label="Nombre del alumno"
                      >

                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                          :rules="[rules.required]"
                          label="Código Alumno"
                          maxlength="6"
                          filled
                          outlined
                      >

                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <v-autocomplete
                          :items="users"
                          v-model="examRequest.user_id"
                          clearable
                          outlined
                          filled
                          label="Selecciona un profesor"
                          no-data-text="No existe un profesor con ese nombre"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="6">
                      <v-autocomplete
                          clearable
                          filled
                          outlined
                          :items="subjects"
                          v-model="examRequest.subject_id"
                          :disabled="!examRequest.user_id"
                          @input="getExams"
                          label="Selecciona una materia"
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <v-autocomplete
                          clearable
                          filled
                          outlined
                          :rules="[rules.required]"
                          v-model="examRequest.exam_id"
                          :loading="exams.loading"
                          :items="exams.values"
                          :disabled="exams.values.length <= 0"
                          label="Selecciona un examen"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                      label="Ingresa el código del examen"
                      v-model="teacher_code"
                      :success="disabledButton"
                      maxlength="4"
                      filled
                      outlined
                      counter="4"
                      :rules="[validateCode, rules.required]">
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-btn
                          block
                          outlined
                          color="primary"
                          x-large
                          @click="submit"
                      >
                        Aceptar
                      </v-btn>
                    </v-col>
                  </v-row>

                </v-container>
              </v-form>
            </v-card-text>
          </v-card>
            <v-sheet v-else>
              <v-form ref="alum-exam">
                <v-container>
                  <v-row>
                    <v-col>
                     <v-card outlined>
                       <v-card-title>
                         <section class="grid-container">
                           <p class="grid-item-1 text-subtitle-2 font-weight-medium text-capitalize">Materia: {{ subjectSelected[0].text }}</p>
                           <p class="grid-item-2 text-subtitle-2 font-weight-medium text-capitalize">Examen: {{examenSelected[0].text}}</p>
                           <p class="grid-item-3 text-subtitle-2 font-weight-medium text-capitalize">nombre del alumno: {{examRequest.student_name}} </p>
                           <p class="grid-item-4 text-subtitle-1 font-weight-medium text-capitalize">Tiempo restante</p>
                         </section>
                       </v-card-title>
                       <v-card-text>
                         <v-form>
                           <v-container>
                             <v-row>
                               <v-col>
                               </v-col>
                             </v-row>
                             <v-row>
                              <v-col cols="12" v-for="question in questions" :key="question.id">
                                <v-divider></v-divider>
                                <p class="text-capitalize text-subtitle-1">{{ question.question }}</p>
                                <v-radio-group
                                    v-model="question.answer"
                                    row
                                    v-for="option in question.options" :key="option.option"
                                >
                                  <v-radio
                                      :value="option.option"
                                      :label="option.option"></v-radio>
                                </v-radio-group>
                                <v-divider></v-divider>
                              </v-col>
                             </v-row>
                           </v-container>
                         </v-form>
                       </v-card-text>
                     </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-sheet>
          </transition>
        </v-col>
      </v-row>
    </v-container>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      questions:[],
      answers:[],
      showCard:1,
      rules: {
        required: value => !!value || 'campo requerido.',
      },
      disabledButton: false,
      teacher_code: null,
      examRequest:{
        user_id: null,
        subject_id: null,
        exam_id: null,
        minutes_assigns: null,
        minutes: null,
        student_code: null,
        student_name: null,
      },
      users: [],
      subjects: [],
      exams: {
        loading: false,
        values: []
      },
    }
  },
  created(){
    axios.get('/api/init-exam')
        .then(( { data }) => {
           this.users = data.users.map((user) => {
             return {value: user.id, text:user.name}
           })
          this.subjects = data.subjects.map((subject) => {
            return {value: subject.id, text:subject.name}
          })
         })
  },
  computed:{
    subjectSelected() {
        return this.subjects.filter((subject) => subject.value === this.examRequest.subject_id)
    },
    examenSelected() {
      return this.exams.values.filter((exam) => exam.value === this.examRequest.exam_id)
    },
  },
  methods:{
    validateCode() {
       let [examSelected] = this.exams.values.filter((exam) => (exam.value === this.examRequest.exam_id))
      this.disabledButton = examSelected?.code === this.teacher_code
       return  examSelected?.code === this.teacher_code || 'Código invalido'
    },
    submit(){
      if (this.$refs.form.validate()){
        this.showCard = !this.$refs.form.validate()
        this.getExam()
      }

    },
    async getExams() {
      try{
        this.exams.loading = true;
        let { data } = await axios.get(`/api/exams/${this.examRequest.user_id}/${this.examRequest.subject_id}`)
        this.exams.values = data.exams.map((exam) =>{
          return {value: exam.id, text: exam.name, code:exam.code}
        })

      }catch (e) {
        console.error(e.message)
      }finally {
        this.exams.loading = false;
      }

    },
    async getExam() {
      try{
        let { data } = await axios.get(`/api/exam/${this.examRequest.exam_id}`)
        let { low, medium, high } =  this.getRandomExam({
          low:data.data.low,
          medium:data.data.medium,
          high:data.data.high,
          splitQuestions: this.splitQuestionsByLevel(data.data.questions)})
        let exam = low.concat(medium).concat(high)
        let amount = exam.length
        exam = this.getRandomQuestions({amount, questions:low.concat(medium).concat(high)})
        this.questions = exam.map(exam_questions_options => {
          return {
            question:exam_questions_options.question,
            options: exam_questions_options.options,
            answer: null
          }
        })
      }catch (e) {
        console.error(e.message)
      }
    },
    splitQuestionsByLevel(questions) {
      let splitQuestions = {
        low: [],
        medium: [],
        high: []
      }
      for (let i=0; i<questions.length; i++) {
        if (questions[i].level === "B") {
          splitQuestions.medium.push(questions[i])
        }
        if (questions[i].level === "M") {
          splitQuestions.low.push(questions[i])
        }
        if (questions[i].level === "A") {
          splitQuestions.high.push(questions[i])
        }
      }
      return splitQuestions
    },
    getRandomExam({low, medium, high, splitQuestions}) {
      return {
        low: this.getRandomQuestions({amount: low, questions: splitQuestions.low}),
        medium: this.getRandomQuestions({amount: medium, questions: splitQuestions.medium}),
        high: this.getRandomQuestions({amount: high, questions: splitQuestions.high}),
      }
    },
    getRandomQuestions({amount, questions}) {
      let index = 0;
      let randomQuestions = []
      do {
        randomQuestions.push( questions[Math.floor(Math.random() * questions.length)])
        index++;
      }while (index < amount)
      return randomQuestions
    }
  }
}
</script>
<style>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .6s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.grid-container {
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 15px 20px;
  grid-template-areas:
    "grid-item-1 grid-item-4"
    "grid-item-2 grid-item-4"
    "grid-item-3 .";
  width: 100%;
  height: 100%;
}
.grid-item-2 { grid-area: grid-item-2; }
.grid-item-3 { grid-area: grid-item-3; }
.grid-item-1 { grid-area: grid-item-1; }
.grid-item-4 { grid-area: grid-item-4; }
</style>

