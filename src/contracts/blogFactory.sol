// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract BlogFactory {
    uint256 blogCount;

    event NewBlog(
        uint256 blogId,
        string title,
        string content,
        uint256 blogHash
    );

    struct Blog {
        string title;
        string content;
        address publisher;
        uint256 blogHash;
        //We have to add timestap later....
    }

    Blog[] public blogs;

    uint256 randNonce = 0; // for Generating BlogHash
    // declare mappings here
    mapping(uint256 => address) public blogToOwner;
    mapping(address => uint256) public userBlogCount;

    function _publishBlog(
        string memory _title,
        string memory _content,
        uint256 _blogHash
    ) private {
        blogs.push(Blog(_title, _content, msg.sender, _blogHash));
        uint256 id = blogs.length - 1;
        blogToOwner[id] = msg.sender;
        userBlogCount[msg.sender]++;
        blogCount += 1;
        emit NewBlog(id, _title, _content, _blogHash);
    }

    function _generateBlogHash() internal returns (uint256) {
        randNonce++;
        return
            uint256(
                keccak256(
                    abi.encodePacked(block.timestamp, msg.sender, randNonce)
                )
            );
    }

    function createBlog(string memory _title, string memory _content) public {
        //uint randDna = _generateBlogHash(_name);
        uint256 blogHash = _generateBlogHash();
        _publishBlog(_title, _content, blogHash);
    }

    function getBlog(uint256 blogIndex)
        public
        view
        returns (
            string memory,
            string memory,
            address,
            uint256
        )
    {
        return (
            blogs[blogIndex].title,
            blogs[blogIndex].content,
            blogs[blogIndex].publisher,
            blogs[blogIndex].blogHash
        );
    }

    function getBlogCount() public view returns (uint256) {
        return blogCount;
    }

    function getAllBlogs() public view returns (Blog[] memory) {
        return blogs;
    }
}
