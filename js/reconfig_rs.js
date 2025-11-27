// reconfig_rs.js
// Run with: mongo --port 27018 reconfig_rs.js
// If using auth: mongo --username <user> --password <pw> --authenticationDatabase admin --port 27018 reconfig_rs.js

// --- Edit these two lists if you want different choices ---
var all_hosts = [
 "172.18.49.133:27018","172.18.49.134:27018","172.18.49.135:27018","172.18.49.136:27018",
 "172.18.49.137:27018","172.18.49.138:27018","172.18.49.139:27018","172.18.49.140:27018",
 "172.18.49.141:27018","172.18.49.142:27018","172.18.49.143:27018","172.18.49.144:27018",
 "172.18.49.145:27018","172.18.49.146:27018","172.18.49.147:27018","172.18.49.148:27018",
 "172.18.49.149:27018","172.18.49.150:27018","172.18.49.151:27018","172.18.49.152:27018",
 "172.18.49.153:27018","172.18.49.154:27018","172.18.49.155:27018","172.18.49.156:27018",
 "172.18.49.157:27018","172.18.49.158:27018","172.18.49.159:27018",
 "172.18.49.82:27018","172.18.49.83:27018","172.18.49.84:27018","172.18.49.85:27018",
 "172.18.49.86:27018","172.18.49.87:27018","172.18.49.88:27018","172.18.49.89:27018",
 "172.18.49.90:27018","172.18.49.91:27018","172.18.49.92:27018","172.18.49.93:27018",
 "172.18.49.94:27018","172.18.49.95:27018","172.18.49.96:27018","172.18.49.97:27018",
 "172.18.49.98:27018","172.18.49.99:27018","172.18.49.100:27018","172.18.49.101:27018",
 "172.18.49.102:27018","172.18.49.103:27018"
];

var voting_hosts = [
 "172.18.49.133:27018",
 "172.18.49.139:27018",
 "172.18.49.145:27018",
 "172.18.49.82:27018",
 "172.18.49.98:27018"
];
// ---------------------------------------------------------

function isVoting(h) {
  for (var i=0;i<voting_hosts.length;i++) if (voting_hosts[i]===h) return true;
  return false;
}

// try to get existing config
var cfg = null;
try {
  cfg = rs.conf();
} catch (e) {
  print("Warning: rs.conf() threw, proceeding to create new config: " + tojson(e));
}

var rsname = (cfg && cfg._id) ? cfg._id : "rs0";
var version = (cfg && cfg.version) ? cfg.version + 1 : 1;

var members = [];
for (var i=0;i<all_hosts.length;i++) {
  var h = all_hosts[i];
  members.push({
    _id: i,
    host: h,
    priority: isVoting(h) ? 1 : 0,
    votes: isVoting(h) ? 1 : 0,
    hidden: false
  });
}

var newcfg = {
  _id: rsname,
  version: version,
  members: members
};

print("About to apply config for replica set '" + rsname + "' with version " + version);
print("Voting members (count): " + voting_hosts.length);
printjson(voting_hosts);
print("New cfg preview:");
printjson(newcfg);

// Force reconfig because you said there is no primary.
try {
  rs.reconfig(newcfg, {force: true});
  print("rs.reconfig called with {force:true}");
} catch (e) {
  print("rs.reconfig failed: " + tojson(e));
}
