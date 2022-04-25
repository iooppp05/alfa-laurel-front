export default {
  methods: {
    showSnackBar(tag, text, color = "warning") {
      this.$store.commit(
        "settings/SHOW_SNACKBAR",
        {
          value: true,
          text: `${tag}: ${text}`,
          color,
          bottom: true,
        },
        { root: true }
      );
    },
  },
};
