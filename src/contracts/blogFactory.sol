pragma solidity >=0.4.22 <0.9.0;

contract BlogFactory{

   event NewBlog(uint blogId, string title, string content, uint blogHash);

    struct Blog{
        string title;
        string content;
        address publisher;
        uint blogHash;
        //We have to add timestap later....
    }

    Blog[] public blogs;
    
    uint randNonce = 0; // for Generating BlogHash
    // declare mappings here
    mapping (uint => address) public blogToOwner;
    mapping (address => uint) public userBlogCount;



    function _publishBlog(string memory _title, string memory _content, uint _blogHash) private {
        blogs.push(Blog(_title,_content, msg.sender, _blogHash));
        uint id = blogs.length -1;
        blogToOwner[id] = msg.sender;
        userBlogCount[msg.sender]++;
        emit NewBlog(id, _title,_content, _blogHash);
    } 

    function _generateBlogHash() internal returns (uint) {
        randNonce++;
        return uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce))) ;
    }

    function createBlog(string memory _title, string memory _content) public {
        //uint randDna = _generateBlogHash(_name);
        uint blogHash =  _generateBlogHash();
        _publishBlog(_title, _content, blogHash);
    }


    function getBlog(uint blogIndex) public view returns(string memory , string memory, address, uint) {
        return ( blogs[blogIndex].title, 
        blogs[blogIndex].content, 
        blogs[blogIndex].publisher,  
        blogs[blogIndex].blogHash);
    }
}
