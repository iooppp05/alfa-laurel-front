<template>
  <v-row>
    <v-col
      v-for="(option, index) in options"
      :cols="option.cols"
      :md="option.md"
      :key="index"
    >
      <v-text-field
        :label="`Opción-${index + 1}`"
        v-model="option.option"
      ></v-text-field>
    </v-col>
    <v-col cols="1" md="1" class="align-center d-flex">
      <v-btn @click="$emit('remove-question')" color="error" tile small>
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Options",
  data() {
    return {
      options: [
        {
          id: 1,
          option: null,
          is_answer: null,
          cols: "12",
          md: "4",
        },
        {
          id: 2,
          option: null,
          is_answer: null,
          cols: "12",
          md: "4",
        },
        {
          id: 3,
          option: null,
          is_answer: null,
          cols: "11",
          md: "3",
        },
      ],
    };
  },
  watch: {
    options: {
      deep: true,
      handler(value) {
        this.$emit("option-updated", value);
      },
    },
  },
};
</script>

<style scoped></style>
