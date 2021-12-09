/**
 * Hello world
 */

import {
  establishConnection,
  establishPayer,
  checkProgram,
  sayHello,
  reportGreetings,
} from './hello_world';

async function main() {
  console.log("Let's say hello to a Solana account...");

  //首先，客户端会建立一个和节点的连接，使用的的函数是establishConnection：
  // Establish connection to the cluster
  await establishConnection();

  //然后会调用establishPayer函数来确保有一个能支付的账户，如果没有的话就按需创建一个新的。
  // Determine who pays for the fees
  await establishPayer();

  //客户端然后会调用“checkProgram”函数，该函数从 ./dist/program/helloworld-keypair.json中加载部署程序的密钥对，并使用密钥对的公钥来获取程序帐户。
  // 如果程序不存在，客户端会报错并停止。如果该程序确实存在，它将创建一个新帐户存储程序状态，并将程序指定为其所有者，在这种情况下，它是指程序已执行的次数。
  // Check if the program has been deployed
  await checkProgram();

  //然后客户端调用“sayHello”函数并向程序发送“hello”交易事务。该交易包含一条指令，该指令包含要调用的 helloworld程序帐户的公钥以及客户端希望与其交互的帐户。
  // 每次客户端对一个帐户执行此交易时，程序都会增加目标帐户数据存储中的计数。
  // Say hello to an account
  await sayHello();

  //最后，客户端调用“reportGreetings”查询账户数据以检索账户当前调用sayHello事务的次数。
  // Find out how many times that account has been greeted
  await reportGreetings();

  console.log('Success');
}

main().then(
  () => process.exit(),
  err => {
    console.error(err);
    process.exit(-1);
  },
);
