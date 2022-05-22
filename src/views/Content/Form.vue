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
              :options="[]"
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
        value: 'Інформаційна аналітика та зв\'язки з громадськістю',
        label: 'Інформаційна аналітика та зв\'язки з громадськістю',
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
          '\'Інформаційні технології автоматизації бізнес-процесів та аналізу даних\' 2019',
        label:
          '\'Інформаційні технології автоматизації бізнес-процесів та аналізу даних\' 2019',
        level: 'Бакалавр',
        specialty: 'Системний аналіз',
      },

      {
        value: '\'Системний аналіз\' 2016',
        label: '\'Системний аналіз\' 2016',
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
          '\'Інженерія програмного забезпечення\' першого (бакалаврського) рівня вищої освіти 2021 р.',
        label:
          '\'Інженерія програмного забезпечення\' першого (бакалаврського) рівня вищої освіти 2021 р.',
        level: 'Бакалавр',
        specialty: 'Інженерія програмного забезпечення',
      },

      {
        value:
          '\'Інженерія програмного забезпечення\' першого (бакалаврського) рівня вищої освіти 2019 р.',
        label:
          '\'Інженерія програмного забезпечення\' першого (бакалаврського) рівня вищої освіти 2019 р.',
        level: 'Бакалавр',
        specialty: 'Інженерія програмного забезпечення',
      },

      {
        value:
          '\'Інженерія програмного забезпечення\' першого (бакалаврського) рівня вищої освіти 2016 р.',
        label:
          '\'Інженерія програмного забезпечення\' першого (бакалаврського) рівня вищої освіти 2016 р.',
        level: 'Бакалавр',
        specialty: 'Інженерія програмного забезпечення',
      },

      {
        value:
          '\'Інженерія програмного забезпечення\' другого (магістерського) рівня вищої освіти 2021 р.',
        label:
          '\'Інженерія програмного забезпечення\' другого (магістерського) рівня вищої освіти 2021 р.',
        level: 'Магістр',
        specialty: 'Інженерія програмного забезпечення',
      },

      {
        value:
          '\'Інженерія програмного забезпечення\' другого (магістерського) рівня вищої освіти 2019 р.',
        label:
          '\'Інженерія програмного забезпечення\' другого (магістерського) рівня вищої освіти 2019 р.',
        level: 'Магістр',
        specialty: 'Інженерія програмного забезпечення',
      },

      {
        value:
          '\'Інженерія програмного забезпечення\' другого (магістерського) рівня вищої освіти 2016 р.',
        label:
          '\'Інженерія програмного забезпечення\' другого (магістерського) рівня вищої освіти 2016 р.',
        level: 'Магістр',
        specialty: 'Інженерія програмного забезпечення',
      },
    ]);

    const educationalProgramFiltered = computed(() =>
      educationalProgram.value.filter(
        (f) =>
          f.level === field_second.value && f.specialty === field_first.value
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
      educationalProgramFiltered,
      clearFields,
      generateDocument,
    };
  },
};
</script>

<style lang="scss"></style>
