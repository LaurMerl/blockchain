## Classes

<dl>
<dt><a href="#Block">Block</a></dt>
<dd></dd>
<dt><a href="#Blockchain">Blockchain</a></dt>
<dd></dd>
</dl>

## Constants

<dl>
<dt><a href="#BLOCK_GENERATION_INTERVAL">BLOCK_GENERATION_INTERVAL</a> ⇒ <code>Number</code></dt>
<dd><p>Consensus on the difficulty in seconds.</p>
</dd>
<dt><a href="#DIFFICULTY_ADJUSTMENT_INTERVAL">DIFFICULTY_ADJUSTMENT_INTERVAL</a> ⇒ <code>Number</code></dt>
<dd><p>Consensus on the difficulty in blocks.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#hexToBinary">hexToBinary()</a> ⇒ <code>String</code></dt>
<dd><p>Conversion function from  Hex to Binary.</p>
</dd>
</dl>

<a name="Block"></a>

## Block
**Kind**: global class  

* [Block](#Block)
    * [.createGenesis()](#Block.createGenesis)
    * [.generateNextBlock(blockData, blockchain)](#Block.generateNextBlock) ⇒ [<code>Block</code>](#Block)
    * [.calculateHash(index, previousHash, timestamp, data, difficulty, nonce)](#Block.calculateHash) ⇒ <code>String</code>
    * [.mineBlock(index, previousHash, timestamp, data, difficulty)](#Block.mineBlock) ⇒ [<code>Block</code>](#Block)
    * [.hashMatchesDifficulty(hash, difficulty)](#Block.hashMatchesDifficulty) ⇒ <code>Boolean</code>
    * [.isValidNewBlock(newBlock, previousBlock)](#Block.isValidNewBlock) ⇒ <code>Boolean</code>
    * [.isValidTimestamp(newBlock, previousBlock)](#Block.isValidTimestamp) ⇒ <code>Boolean</code>


* * *

<a name="Block.createGenesis"></a>

### Block.createGenesis()
Creates the very first block of our chain

**Kind**: static method of [<code>Block</code>](#Block)  

* * *

<a name="Block.generateNextBlock"></a>

### Block.generateNextBlock(blockData, blockchain) ⇒ [<code>Block</code>](#Block)
Creates a block for the chain.

**Kind**: static method of [<code>Block</code>](#Block)  
**Returns**: [<code>Block</code>](#Block) - - Newly created block  

| Param | Type | Description |
| --- | --- | --- |
| blockData | <code>String</code> | Block infromation |
| blockchain | [<code>Blockchain</code>](#Blockchain) | Current blockchain |


* * *

<a name="Block.calculateHash"></a>

### Block.calculateHash(index, previousHash, timestamp, data, difficulty, nonce) ⇒ <code>String</code>
Takes in every piece of the block object, throws it into a SHA256 function, and converts it into a string.

**Kind**: static method of [<code>Block</code>](#Block)  
**Returns**: <code>String</code> - - Encrypted block infromation  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>Integer</code> | Block index |
| previousHash | <code>String</code> | Block previousHash |
| timestamp | <code>Integer</code> | Block timestamp |
| data | <code>Integer</code> | Block data |
| difficulty | <code>Integer</code> | Block difficulty |
| nonce | <code>Integer</code> | Block nonce |


* * *

<a name="Block.mineBlock"></a>

### Block.mineBlock(index, previousHash, timestamp, data, difficulty) ⇒ [<code>Block</code>](#Block)
Block's creation.

**Kind**: static method of [<code>Block</code>](#Block)  
**Returns**: [<code>Block</code>](#Block) - - New block object  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>Integer</code> | Block index |
| previousHash | <code>String</code> | Block previousHash |
| timestamp | <code>Integer</code> | Block timestamp |
| data | <code>Integer</code> | Block data |
| difficulty | <code>Integer</code> | Block difficulty |


* * *

<a name="Block.hashMatchesDifficulty"></a>

### Block.hashMatchesDifficulty(hash, difficulty) ⇒ <code>Boolean</code>
Block matches current chain's difficulty.

**Kind**: static method of [<code>Block</code>](#Block)  
**Returns**: <code>Boolean</code> - - True if block matches current chain's difficulty  

| Param | Type | Description |
| --- | --- | --- |
| hash | <code>String</code> | Hash |
| difficulty | <code>Number</code> | Difficulty |


* * *

<a name="Block.isValidNewBlock"></a>

### Block.isValidNewBlock(newBlock, previousBlock) ⇒ <code>Boolean</code>
Block's validity.

**Kind**: static method of [<code>Block</code>](#Block)  
**Returns**: <code>Boolean</code> - - True if new block is valid  

| Param | Type | Description |
| --- | --- | --- |
| newBlock | [<code>Block</code>](#Block) | New block |
| previousBlock | [<code>Block</code>](#Block) | Previous block |


* * *

<a name="Block.isValidTimestamp"></a>

### Block.isValidTimestamp(newBlock, previousBlock) ⇒ <code>Boolean</code>
Block's timestamp validity.

**Kind**: static method of [<code>Block</code>](#Block)  
**Returns**: <code>Boolean</code> - - True new block timestamp is valid  

| Param | Type | Description |
| --- | --- | --- |
| newBlock | [<code>Block</code>](#Block) | New block |
| previousBlock | [<code>Block</code>](#Block) | Previous block |


* * *

<a name="Blockchain"></a>

## Blockchain
**Kind**: global class  

* [Blockchain](#Blockchain)
    * _instance_
        * [.latestBlock()](#Blockchain+latestBlock) ⇒ [<code>Block</code>](#Block)
        * [.getBlockchain()](#Blockchain+getBlockchain) ⇒ [<code>Blockchain</code>](#Blockchain)
        * [.addBlock(newBlock)](#Blockchain+addBlock)
        * [.checkValid()](#Blockchain+checkValid) ⇒ <code>Boolean</code>
        * [.getDifficulty(aBlockchain)](#Blockchain+getDifficulty) ⇒ <code>Number</code>
    * _static_
        * [.getAdjustedDifficulty(aBlockchain)](#Blockchain.getAdjustedDifficulty) ⇒ <code>Number</code>


* * *

<a name="Blockchain+latestBlock"></a>

### blockchain.latestBlock() ⇒ [<code>Block</code>](#Block)
Get the information about the most recent block.

**Kind**: instance method of [<code>Blockchain</code>](#Blockchain)  

* * *

<a name="Blockchain+getBlockchain"></a>

### blockchain.getBlockchain() ⇒ [<code>Blockchain</code>](#Blockchain)
Get the chain.

**Kind**: instance method of [<code>Blockchain</code>](#Blockchain)  

* * *

<a name="Blockchain+addBlock"></a>

### blockchain.addBlock(newBlock)
Given a newBlock, uses latestBlock() to give its index, previousHash and hash

**Kind**: instance method of [<code>Blockchain</code>](#Blockchain)  

| Param | Type | Description |
| --- | --- | --- |
| newBlock | [<code>Block</code>](#Block) | block object |


* * *

<a name="Blockchain+checkValid"></a>

### blockchain.checkValid() ⇒ <code>Boolean</code>
Checks the the integrity of the blockchain

**Kind**: instance method of [<code>Blockchain</code>](#Blockchain)  
**Returns**: <code>Boolean</code> - - true if block is valid  

* * *

<a name="Blockchain+getDifficulty"></a>

### blockchain.getDifficulty(aBlockchain) ⇒ <code>Number</code>
Retrieve the difficulty of the chain

**Kind**: instance method of [<code>Blockchain</code>](#Blockchain)  
**Returns**: <code>Number</code> - - chain's difficulty  

| Param | Type | Description |
| --- | --- | --- |
| aBlockchain | [<code>Blockchain</code>](#Blockchain) | current blockchain |


* * *

<a name="Blockchain.getAdjustedDifficulty"></a>

### Blockchain.getAdjustedDifficulty(aBlockchain) ⇒ <code>Number</code>
The difficulty must be adjusted in order to match the chain difficulty
For every DIFFICULTY_ADJUSTMENT_INTERVAL blocks that is generated, 
we check if the time that took to generate those blocks are larger or smaller than the expected BLOCK_GENERATION_INTERVAL time

**Kind**: static method of [<code>Blockchain</code>](#Blockchain)  
**Returns**: <code>Number</code> - - adjusted block difficulty  

| Param | Type | Description |
| --- | --- | --- |
| aBlockchain | [<code>Blockchain</code>](#Blockchain) | current blockchain |


* * *

<a name="BLOCK_GENERATION_INTERVAL"></a>

## BLOCK_GENERATION_INTERVAL ⇒ <code>Number</code>
Consensus on the difficulty in seconds.

**Kind**: global constant  

* * *

<a name="DIFFICULTY_ADJUSTMENT_INTERVAL"></a>

## DIFFICULTY_ADJUSTMENT_INTERVAL ⇒ <code>Number</code>
Consensus on the difficulty in blocks.

**Kind**: global constant  

* * *

<a name="hexToBinary"></a>

## hexToBinary() ⇒ <code>String</code>
Conversion function from  Hex to Binary.

**Kind**: global function  
**Returns**: <code>String</code> - - Binary value as string  

| Type | Description |
| --- | --- |
| <code>String</code> | Hex string to be converted |


* * *

