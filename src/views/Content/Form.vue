<template>
  <div class="form">
    <div class="form__title">Створення силабусу</div>

    <div class="form__content">
      <div class="form__wrapper">
        <div class="form__row">
          <div class="form__col">
            <Select
              v-model:value="field_first"
              :options="specialtyList"
              placeholder="Спеціальність"
              :reduce-label="(v) => v.label"
              :reduce-value="(v) => v.value"
            />
          </div>
          <div class="form__col">
            <Select
              v-model:value="field_second"
              :options="educationalLavel"
              placeholder="Рівень освіти"
              :reduce-label="(v) => v.label"
              :reduce-value="(v) => v.value"
            />
          </div>
        </div>

        <div class="form__row">
          <div class="form__col">
            <Select
              v-model:value="field_third"
              :options="educationalProgramFiltered"
              placeholder="Освітня програма"
              :reduce-label="(v) => v.label"
              :reduce-value="(v) => v.value"
            />
          </div>
          <div class="form__col">
            <Select
              v-model:value="field_fourth"
              :options="subjectsListfiltered"
              placeholder="Назва дисципліни"
              :reduce-label="(v) => v.label"
              :reduce-value="(v) => v.value"
            />
          </div>
        </div>

        <div class="form__row">
          <div class="form__col">Кількість годин лекційних занять:</div>
          <div class="form__col">
            <input
              v-model="lecture"
              v-maska="'#*'"
              type="text"
              class="input --white"
            />
          </div>
        </div>

        <div class="form__row">
          <div class="form__col">Кількість годин практичних занять:</div>
          <div class="form__col">
            <input
              v-model="practice"
              v-maska="'#*'"
              type="text"
              class="input --white"
            />
          </div>
        </div>

        <div class="form__row">
          <div class="form__col">Кількість годин лабораторних занять:</div>
          <div class="form__col">
            <input
              v-model="lessons"
              v-maska="'#*'"
              type="text"
              class="input --white"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="form__footer">
      <button class="button" type="button" @click="generateDocument">
        Сгенерувати силабус
      </button>
      <button
        class="button --margin-left --danger"
        type="button"
        @click="clearFields"
        v-if="
          lecture ||
          practice ||
          lessons ||
          field_first ||
          field_second ||
          field_third ||
          field_fourth
        "
      >
        Відміна
      </button>
    </div>
  </div>
</template>

<script>
import Select from '@/components/Select.vue';
import { computed, nextTick } from '@vue/runtime-core';
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  components: {
    Select,
  },

  setup() {
    const store = useStore();
    const router = useRouter();

    const lecture = ref('');
    const practice = ref('');
    const lessons = ref('');
    const field_first = ref('');
    const field_second = ref('');
    const field_third = ref('');
    const field_fourth = ref('');
    const educationalLavel = ref([
      {
        value: 'Бакалавр',
        label: 'Бакалавр',
      },

      {
        value: 'Магістр',
        label: 'Магістр',
      },
    ]);
    const specialtyList = ref([
      {
        value: 'Телекомунікаційні системи та мережі',
        label: 'Телекомунікаційні системи та мережі',
      },

      {
        value: 'Мобільні телекомунікації та системи цифрового телебачення',
        label: 'Мобільні телекомунікації та системи цифрового телебачення',
      },

      {
        value: 'Системний аналіз',
        label: 'Системний аналіз',
      },

      {
        value: 'Інженерія програмного забезпечення',
        label: 'Інженерія програмного забезпечення',
      },

      {
        value: 'Комп’ютерна інженерія',
        label: 'Комп’ютерна інженерія',
      },

      {
        value: 'Комп’ютерні науки',
        label: 'Комп’ютерні науки',
      },

      {
        value: 'Штучний інтелект',
        label: 'Штучний інтелект',
      },

      {
        value: 'Інформаційна та кібернетична безпека',
        label: 'Інформаційна та кібернетична безпека',
      },

      {
        value: 'Технічні системи інформаційного та кібернетичного захисту',
        label: 'Технічні системи інформаційного та кібернетичного захисту',
      },

      {
        value: 'Управління інформаційною та кібернетичною безпекою',
        label: 'Управління інформаційною та кібернетичною безпекою',
      },

      {
        value: 'Публічне управління та адміністрування',
        label: 'Публічне управління та адміністрування',
      },

      {
        value: 'Документознавство та інформаційна діяльність',
        label: 'Документознавство та інформаційна діяльність',
      },

      {
        value: "Інформаційна аналітика та зв'язки з громадськістю",
        label: "Інформаційна аналітика та зв'язки з громадськістю",
      },

      {
        value: 'Соціологія',
        label: 'Соціологія',
      },

      {
        value: 'Менеджмент',
        label: 'Менеджмент',
      },

      {
        value: 'Маркетинг',
        label: 'Маркетинг',
      },

      {
        value: 'Підприємництво, торгівля та біржова діяльність',
        label: 'Підприємництво, торгівля та біржова діяльність',
      },
    ]);
    const educationalProgram = ref([
      {
        value:
          "'Інформаційні технології автоматизації бізнес-процесів та аналізу даних' 2019",
        label:
          "'Інформаційні технології автоматизації бізнес-процесів та аналізу даних' 2019",
        level: 'Бакалавр',
        specialty: 'Системний аналіз',
      },

      {
        value: "'Системний аналіз' 2016",
        label: "'Системний аналіз' 2016",
        level: 'Бакалавр',
        specialty: 'Системний аналіз',
      },

      {
        value:
          '«Інтелектуальні системи управління» (оновлення на основі стандартів 2021 року)',
        label:
          '«Інтелектуальні системи управління» (оновлення на основі стандартів 2021 року)',
        level: 'Магістр',
        specialty: 'Системний аналіз',
      },

      {
        value:
          "'Інженерія програмного забезпечення' першого (бакалаврського) рівня вищої освіти 2021 р.",
        label:
          "'Інженерія програмного забезпечення' першого (бакалаврського) рівня вищої освіти 2021 р.",
        level: 'Бакалавр',
        specialty: 'Інженерія програмного забезпечення',
      },

      {
        value:
          "'Інженерія програмного забезпечення' першого (бакалаврського) рівня вищої освіти 2019 р.",
        label:
          "'Інженерія програмного забезпечення' першого (бакалаврського) рівня вищої освіти 2019 р.",
        level: 'Бакалавр',
        specialty: 'Інженерія програмного забезпечення',
      },

      {
        value:
          "'Інженерія програмного забезпечення' першого (бакалаврського) рівня вищої освіти 2016 р.",
        label:
          "'Інженерія програмного забезпечення' першого (бакалаврського) рівня вищої освіти 2016 р.",
        level: 'Бакалавр',
        specialty: 'Інженерія програмного забезпечення',
      },

      {
        value:
          "'Інженерія програмного забезпечення' другого (магістерського) рівня вищої освіти 2021 р.",
        label:
          "'Інженерія програмного забезпечення' другого (магістерського) рівня вищої освіти 2021 р.",
        level: 'Магістр',
        specialty: 'Інженерія програмного забезпечення',
      },

      {
        value:
          "'Інженерія програмного забезпечення' другого (магістерського) рівня вищої освіти 2019 р.",
        label:
          "'Інженерія програмного забезпечення' другого (магістерського) рівня вищої освіти 2019 р.",
        level: 'Магістр',
        specialty: 'Інженерія програмного забезпечення',
      },

      {
        value:
          "'Інженерія програмного забезпечення' другого (магістерського) рівня вищої освіти 2016 р.",
        label:
          "'Інженерія програмного забезпечення' другого (магістерського) рівня вищої освіти 2016 р.",
        level: 'Магістр',
        specialty: 'Інженерія програмного забезпечення',
      },
    ]);

    const subjectsList = ref([
      {
        value: 'Ділові комунікації',
        label: 'Ділові комунікації',
        specialty: 'Інженерія програмного забезпечення',
        program: '',
      },

      {
        value: 'Філософія',
        label: 'Філософія',
        specialty: 'Інженерія програмного забезпечення',
        program: '',
      },

      {
        value: 'Іноземна мова',
        label: 'Іноземна мова',
        specialty: 'Інженерія програмного забезпечення',
        program: '',
      },

      {
        value: 'Вища математика',
        label: 'Вища математика',
        specialty: 'Інженерія програмного забезпечення',
        program: '',
      },

      {
        value: "Комп'ютерні дискретні структури",
        label: "Комп'ютерні дискретні структури",
        specialty: 'Інженерія програмного забезпечення',
        program: '',
      },

      {
        value: 'Соціально-екологічна безпека життєдіяльності',
        label: 'Соціально-екологічна безпека життєдіяльності',
        specialty: 'Інженерія програмного забезпечення',
        program: '',
      },

      {
        value: 'Засади відкриття власного бізнесу',
        label: 'Засади відкриття власного бізнесу',
        specialty: 'Інженерія програмного забезпечення',
        program: '',
      },

      {
        value: 'Дослідження операцій',
        label: 'Дослідження операцій',
        specialty: 'Інженерія програмного забезпечення',
        program: '',
      },

      {
        value: 'Застосування інформаційно-телекомунікаційних засобів',
        label: 'Застосування інформаційно-телекомунікаційних засобів',
        specialty: 'Інженерія програмного забезпечення',
        program: '',
      },

      {
        value: 'Групова динаміка і комунікації',
        label: 'Групова динаміка і комунікації',
        specialty: 'Інженерія програмного забезпечення',
        program: '',
      },

      {
        value: 'Психолінгвістика',
        label: 'Психолінгвістика',
        specialty: 'Інженерія програмного забезпечення',
        program: '',
      },

      {
        value: 'Основи бази даних',
        label: 'Основи бази даних',
        specialty: 'Інженерія програмного забезпечення',
        program: '',
      },

      {
        value: 'Програмування С++',
        label: 'Програмування С++',
        specialty: 'Інженерія програмного забезпечення',
        program: '',
      },

      {
        value:
          'Основи інженерії програмного забезпечення Алгоритми і структура даних C++',
        label:
          'Основи інженерії програмного забезпечення Алгоритми і структура даних C++',
        specialty: 'Інженерія програмного забезпечення',
        program: '',
      },

      {
        value: 'Проектування інтерфейсу користувача',
        label: 'Проектування інтерфейсу користувача',
        specialty: 'Інженерія програмного забезпечення',
        program: '',
      },

      {
        value: "Комп'ютерна обробка зображень та мультимедіа",
        label: "Комп'ютерна обробка зображень та мультимедіа",
        specialty: 'Інженерія програмного забезпечення',
        program: '',
      },

      {
        value: 'Аналіз вимог до програмного забезпечення',
        label: 'Аналіз вимог до програмного забезпечення',
        specialty: 'Інженерія програмного забезпечення',
        program: '',
      },

      {
        value: "Об'єктно-орієнтоване програмування C#",
        label: "Об'єктно-орієнтоване програмування C#",
        specialty: 'Інженерія програмного забезпечення',
        program: '',
      },

      {
        value: 'Розробка ігор',
        label: 'Розробка ігор',
        specialty: 'Інженерія програмного забезпечення',
        program: '',
      },

      {
        value: 'Моделювання та проектування ПЗ',
        label: 'Моделювання та проектування ПЗ',
        specialty: 'Інженерія програмного забезпечення',
        program: '',
      },

      {
        value: 'Конструювання програмного забезпечення JAVA',
        label: 'Конструювання програмного забезпечення JAVA',
        specialty: 'Інженерія програмного забезпечення',
        program: '',
      },

      {
        value: 'Організація баз даних та знань',
        label: 'Організація баз даних та знань',
        specialty: 'Інженерія програмного забезпечення',
        program: '',
      },

      {
        value: 'Програмування мобільних пристроїв',
        label: 'Програмування мобільних пристроїв',
        specialty: 'Інженерія програмного забезпечення',
        program: '',
      },

      {
        value: 'Емпіричні методи програмної інженерії',
        label: 'Емпіричні методи програмної інженерії',
        specialty: 'Інженерія програмного забезпечення',
        program: '',
      },

      {
        value: 'Економіка програмного забезпечення',
        label: 'Економіка програмного забезпечення',
        specialty: 'Інженерія програмного забезпечення',
        program: '',
      },

      {
        value: 'Сертифікація та ліцензування програмного продукту',
        label: 'Сертифікація та ліцензування програмного продукту',
        specialty: 'Інженерія програмного забезпечення',
        program: '',
      },

      {
        value: 'Хмарні технології',
        label: 'Хмарні технології',
        specialty: 'Інженерія програмного забезпечення',
        program: '',
      },

      {
        value: 'Штучний інтелект',
        label: 'Штучний інтелект',
        specialty: 'Інженерія програмного забезпечення',
        program: '',
      },

      {
        value: 'Безпека програм та даних',
        label: 'Безпека програм та даних',
        specialty: 'Інженерія програмного забезпечення',
        program: '',
      },

      {
        value: 'Ділові комунікації',
        label: 'Ділові комунікації',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Економіка підприємства',
        label: 'Економіка підприємства',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Філософія',
        label: 'Філософія',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Іноземна мова',
        label: 'Іноземна мова',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Вища математика',
        label: 'Вища математика',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Групова динаміка та комунікації',
        label: 'Групова динаміка та комунікації',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Додаткові розділи вищої математики',
        label: 'Додаткові розділи вищої математики',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Прикладні математичні методи системного аналізу',
        label: 'Прикладні математичні методи системного аналізу',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Дискретні структури',
        label: 'Дискретні структури',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Соціально-екологічна безпека життєдіяльності',
        label: 'Соціально-екологічна безпека життєдіяльності',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Засади відкриття власного бізнесу',
        label: 'Засади відкриття власного бізнесу',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Основи менеджменту та управління персоналом',
        label: 'Основи менеджменту та управління персоналом',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Застосування інформаційно-телекомунікаційних засобів',
        label: 'Застосування інформаційно-телекомунікаційних засобів',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Хмарні технології',
        label: 'Хмарні технології',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Прикладне програмування  JAVA',
        label: 'Прикладне програмування  JAVA',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Пакети прикладних програм системного аналізу',
        label: 'Пакети прикладних програм системного аналізу',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Логіка та алгоритми обробки даних',
        label: 'Логіка та алгоритми обробки даних',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Основи системного аналізу',
        label: 'Основи системного аналізу',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Інтерфейси інформаційних систем',
        label: 'Інтерфейси інформаційних систем',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Штучний інтелект',
        label: 'Штучний інтелект',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Організація баз даних та знань',
        label: 'Організація баз даних та знань',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Системний аналіз та проектування інформаційних систем',
        label: 'Системний аналіз та проектування інформаційних систем',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: "Математичні основи комп'ютерної техніки",
        label: "Математичні основи комп'ютерної техніки",
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Аналіз та застосування технологій програмування',
        label: 'Аналіз та застосування технологій програмування',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Моделювання та синтез систем управління',
        label: 'Моделювання та синтез систем управління',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Технології business intelligence',
        label: 'Технології business intelligence',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Системи підтримки прийняття рішень',
        label: 'Системи підтримки прийняття рішень',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Якість та тестування інформаційних систем',
        label: 'Якість та тестування інформаційних систем',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Основи CCNA-security',
        label: 'Основи CCNA-security',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Інтернет-технології та проектування WEB-додатків',
        label: 'Інтернет-технології та проектування WEB-додатків',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: "Комп'ютерна обробка зображень та мультимедіа",
        label: "Комп'ютерна обробка зображень та мультимедіа",
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Ознайомча практика',
        label: 'Ознайомча практика',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Виробнича практика',
        label: 'Виробнича практика',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Переддипломна практика',
        label: 'Переддипломна практика',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Кваліфікаційна робота',
        label: 'Кваліфікаційна робота',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Підсумкова атестація',
        label: 'Підсумкова атестація',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Автоматизація управління бізнес-процесами',
        label: 'Автоматизація управління бізнес-процесами',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Аналіз вимог до інформаційних систем',
        label: 'Аналіз вимог до інформаційних систем',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Управління проектами інформаційних систем',
        label: 'Управління проектами інформаційних систем',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Спеціалізоване прикладне програмування',
        label: 'Спеціалізоване прикладне програмування',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: "Технології об'єктно-орієнтованого аналізу",
        label: "Технології об'єктно-орієнтованого аналізу",
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Конвергентна мережна інфраструктура',
        label: 'Конвергентна мережна інфраструктура',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Глобальна інформаційна інфраструктура',
        label: 'Глобальна інформаційна інфраструктура',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Операційні системи',
        label: 'Операційні системи',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Бізнес-інформатика',
        label: 'Бізнес-інформатика',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },

      {
        value: 'Основи data science',
        label: 'Основи data science',
        specialty: '',
        program: "'Системний аналіз' 2016",
      },
    ]);

    const educationalProgramFiltered = computed(() =>
      educationalProgram.value.filter(
        (f) =>
          f.level === field_second.value && f.specialty === field_first.value
      )
    );

    const subjectsListfiltered = computed(() =>
      subjectsList.value.filter(
        (f) =>
          f.specialty === field_first.value || f.program === field_third.value
      )
    );

    const clearFields = () => {
      lecture.value = '';
      practice.value = '';
      lessons.value = '';
      field_first.value = '';
      field_second.value = '';
      field_third.value = '';
      field_fourth.value = '';
    };

    const generateDocument = async () => {
      if (
        lecture.value &&
        practice.value &&
        lessons.value &&
        field_first.value &&
        field_second.value &&
        field_third.value
      ) {
        const data = await store.dispatch('document/documentCreate', {
          specialty: field_first.value,
          educational_level: field_second.value,
          educational_program: field_third.value,
          subject: field_fourth.value,
          lectures: parseInt(lecture.value),
          practical_classes: parseInt(practice.value),
          laboratory_classes: parseInt(lessons.value),
        });

        if (data.id) {
          nextTick(() => {
            router.push({
              name: 'content.history',
            });
          });
        }
      }
    };

    return {
      lecture,
      practice,
      lessons,
      field_first,
      field_second,
      field_third,
      field_fourth,
      educationalLavel,
      specialtyList,
      subjectsListfiltered,
      educationalProgramFiltered,
      clearFields,
      generateDocument,
    };
  },
};
</script>

<style lang="scss"></style>
