import { execSync } from "node:child_process";
import { createInterface } from "node:readline/promises";

const commandToRun = process.argv.slice(2).join(" ");

if (!commandToRun) {
  console.error("❌ No command provided to execute.");
  process.exit(1);
}

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(
  "🚨 \x1b[31m\x1b[1mWARNING:\x1b[0m You are about to run a command against the \x1b[1mPRODUCTION\x1b[0m environment.",
);
console.log(`   Command: \x1b[33m${commandToRun}\x1b[0m`);

const answer = await rl.question(
  "   Are you sure you want to continue? (y/N) ",
);
rl.close();

if (answer.toLowerCase() !== "y") {
  console.log("🛑 Operation cancelled.");
  process.exit(0);
}

console.log("✅ Proceeding with command...");

try {
  execSync(commandToRun, { stdio: "inherit" });
} catch (error) {
  console.error("\n❌ Command failed.");
  process.exit(1);
}
