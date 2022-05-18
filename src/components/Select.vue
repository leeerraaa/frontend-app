<template>
  <div
    class="select-white"
    v-click-outside="onClose"
    ref="selectRef"
    :class="{ '--state-opened': opened, '--dropdown-top': dropdownTop }"
  >
    <div class="select-white__wrapper" @click.prevent="onToggle">
      <div
        class="select-white__field"
        :class="{
          '--placeholder': !isFilled && placeholder,
        }"
      >
        {{ formattedValue ? `${formattedValue}` : placeholder }}
      </div>
      <div class="select-white__arrow" />
    </div>

    <div class="select-white__options" v-if="opened">
      <div
        class="select-white__options-item"
        v-for="option in options"
        :key="`option-${reduceValue(option)}`"
        @click.prevent="onInput(option)"
        :class="{
          '--state-selected': isOptionSelected(option),
        }"
      >
        {{ reduceLabel(option) }}
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core';
import { ref } from '@vue/reactivity';
import { find } from 'lodash';

export default {
  props: {
    value: {
      type: [String, Array, Number],
      default: '',
    },

    placeholder: {
      type: String,
      default: '',
    },

    reduceLabel: {
      type: Function,
      default: (option) => option,
    },

    reduceValue: {
      type: Function,
      default: (option) => option,
    },

    options: {
      type: Array,
      default: () => [],
    },
  },

  setup(props, { emit }) {
    const selectRef = ref(null);
    const opened = ref(false);
    const dropdownTop = ref(false);

    const isFilled = computed(() => !!props.value);

    const formattedValue = computed(() => {
      const option = find(
        props.options,
        (currentOption) => props.reduceValue(currentOption) === props.value
      );
      return option ? props.reduceLabel(option) : '';
    });

    const isOptionSelected = (option) =>
      props.reduceValue(option) === props.value;

    const onClose = () => {
      opened.value = false;
    };

    const onToggle = () => {
      opened.value = !opened.value;

      if (opened.value) {
        const DEFAULT_OPTIONS_HEIGHT = 260;

        const { bottom, top } = selectRef.value?.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const bottomOptionsSpace = windowHeight - bottom;

        // if it's not enough space for options under the select, place it above (also if it's more space above then underneath)
        if (
          bottomOptionsSpace < DEFAULT_OPTIONS_HEIGHT &&
          top > bottomOptionsSpace
        ) {
          dropdownTop.value = true;
        } else {
          dropdownTop.value = false;
        }
      }
    };

    const onInput = (option) => {
      const optionValue = props.reduceValue(option);
      onClose();
      emit('update:value', optionValue);
    };

    return {
      isFilled,
      selectRef,
      opened,
      dropdownTop,
      isOptionSelected,
      onClose,
      onToggle,
      onInput,
      formattedValue,
    };
  },
};
</script>

<style lang="scss"></style>
