export default {
  methods: {
    showSnackBar(tag, text) {
      this.$store.commit(
        "settings/SHOW_SNACKBAR",
        {
          value: true,
          text: `${tag}: ${text}`,
          color: "danger",
          bottom: true,
        },
        { root: true }
      );
    },
  },
};
