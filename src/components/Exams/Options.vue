<template>
  <v-row>
    <v-col
      v-for="(option, index) in options"
      :key="index"
      :cols="option.cols"
      :md="option.md"
    >
      <v-text-field
        :label="`Opción-${index + 1}`"
        v-model="option.option"
      ></v-text-field>
    </v-col>
    <v-col cols="1" md="1" class="align-center d-flex">
      <v-tooltip right>
        <template #activator="{ on }">
          <v-btn @click="$emit('remove-question')" color="error" tile small v-on="on">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>Eliminar pregunta</span>
      </v-tooltip>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Options",
  props: ["options"],
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
