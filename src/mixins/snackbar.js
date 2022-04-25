export default {
  methods: {
    showSnackBar(e) {
      const [errors] = Object.entries(e.response.data.errors);
      this.$store.commit(
        "settings/SHOW_SNACKBAR",
        {
          value: true,
          text: `${errors[0]}: ${errors[1]}`,
          color: "danger",
          bottom: true,
        },
        { root: true }
      );
    },
  },
};
