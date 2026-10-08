const HASH = "ab".repeat(32);
const DAY = "2026-10-08";
const EMAIL = "elev@example.com";

function sampleCollections() {
  return {
    auth: {
      accounts: {
        [EMAIL]: {
          passwordHash: "hash",
          salt: "salt",
          role: "student",
          mustRename: false,
          profile: {
            username: "elev",
            class: "5",
            parentEmail: "parinte@example.com"
          },
          consent: { status: "notified" }
        }
      },
      sessions: {
        [HASH]: { email: EMAIL, expiresAt: 1700000000000 }
      },
      resets: {
        [HASH]: { email: EMAIL, expiresAt: 1700000001000 }
      }
    },
    friends: {
      settings: { [EMAIL]: { visibility: "class" } },
      friends: { [EMAIL]: ["coleg"] },
      requests: [{ id: "req1", from: "coleg@example.com", to: EMAIL, status: "pending" }],
      sends: { [EMAIL]: { count: 1 } },
      blocks: ["coleg@example.com|elev@example.com"],
      privatize: { [HASH]: { email: EMAIL, expiresAt: 1700000002000 } }
    },
    calendar: {
      events: {
        [EMAIL]: [
          { id: "ev1", date: DAY, title: "Test", type: "test", time: "10:00" },
          { id: "ev2", date: DAY, title: "Tema", type: "tema", time: "18:00" }
        ]
      },
      connections: {}
    },
    memory: {
      [`${EMAIL}::thread1`]: [{ role: "user", text: "cat fac 2+2" }]
    },
    consent: {
      tokens: { [HASH]: { childEmail: EMAIL, expiresAt: 1700000003000 } },
      magic: {},
      emailChanges: {},
      unsubs: {},
      parentSessions: {},
      sends: {
        child: { [EMAIL]: { at: DAY } },
        parent: {}
      }
    },
    economy: {
      users: {
        [EMAIL]: {
          balance: 12,
          xp: 5,
          inventory: ["pen"],
          chapters: { m5: 1 },
          activityLog: [{ at: DAY }]
        }
      },
      notifications: [{ id: "n1", userId: EMAIL, text: "bun venit" }],
      purchases: { [`${EMAIL}:pen`]: { item: "pen" } }
    },
    moderare: {
      reports: [{ id: "r1", reason: "nume" }],
      log: [{ action: "hide", at: DAY }]
    },
    crisis: { counts: { [DAY]: 2 } },
    deletions: { records: [{ userIdHash: HASH, at: "2026-10-01T00:00:00.000Z" }] },
    smoke: { alice: { xp: 1 }, bob: { xp: 2 } },
    extra: ["a", "b"]
  };
}

export { sampleCollections, HASH, EMAIL, DAY };
