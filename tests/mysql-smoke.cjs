// Proces separat: STORE=mysql nu are voie să se scurgă în celelalte teste.
const persistence = require("../backend/src/data/persistence");

const state = { bucket: {} };
persistence.register("smoke", {
  snapshot: () => state.bucket,
  restore(data) {
    state.bucket = data && typeof data === "object" && !Array.isArray(data) ? data : {};
  }
});

function finish(payload) {
  persistence.close();
  process.stdout.write(JSON.stringify(payload));
}

const phase = process.argv[2];
try {
  if (phase === "write") {
    persistence.load();
    state.bucket = { alice: { xp: 1 }, bob: { xp: 2 } };
    finish(persistence.saveNow());
  } else if (phase === "patch") {
    persistence.load();
    state.bucket.alice = { xp: 5 };
    finish(persistence.saveNow());
  } else if (phase === "read") {
    const loaded = persistence.load();
    finish({ loaded: loaded.loaded, bucket: state.bucket });
  } else {
    finish({ error: "phase" });
    process.exit(1);
  }
} catch (error) {
  persistence.close();
  process.stderr.write(String(error && error.message || error));
  process.exit(1);
}
