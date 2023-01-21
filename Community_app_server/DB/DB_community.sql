-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jan 04, 2023 at 08:04 AM
-- Server version: 5.7.34
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `DB_community`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_comment`
--

CREATE TABLE `tb_comment` (
  `com_id` int(11) NOT NULL COMMENT 'ไอดีcomment',
  `post_id` int(11) NOT NULL COMMENT 'ไอดีที่comment โพส',
  `user_reply` int(11) NOT NULL COMMENT 'คนที่ ถูก comment',
  `user_id` int(11) NOT NULL COMMENT 'คนที่ comment เขา',
  `com_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'เนื้อหา comment',
  `com_date` text NOT NULL COMMENT 'วันที comment',
  `com_status` int(11) NOT NULL COMMENT 'สถานะ comment 1 ลบ 0 ไม่ลบ'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tb_follow`
--

CREATE TABLE `tb_follow` (
  `follow_id` int(11) NOT NULL COMMENT 'id Follow',
  `user_id` int(11) NOT NULL COMMENT 'เราที่ไปติตตามเขา',
  `follow_followers` int(11) NOT NULL COMMENT 'คนที่เราติดตาม',
  `follow_status` int(11) NOT NULL COMMENT 'สถานะการติดตาม 0 ติด 1 ลบ'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tb_likes`
--

CREATE TABLE `tb_likes` (
  `like_id` int(11) NOT NULL COMMENT 'ไอดีคนที่ไลค์',
  `like_user` int(11) NOT NULL COMMENT 'กดไลค์เขา',
  `user_id` int(11) NOT NULL COMMENT 'คนที่กดไลค์',
  `post_id` int(11) NOT NULL COMMENT 'โพสที่กดไลค์',
  `like_status` int(11) NOT NULL COMMENT 'สถานะกดไลค์ 1 กด 0 ไม่กด'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tb_post`
--

CREATE TABLE `tb_post` (
  `post_id` int(11) NOT NULL COMMENT 'ไอดีโพส',
  `user_id` int(11) NOT NULL COMMENT 'ไอดีคนโพส',
  `post_description` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'เนื้อหาในโพส',
  `post_img` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'รูปภาพ',
  `post_likes` int(11) NOT NULL COMMENT 'จำนวนคนชอบ',
  `post_date` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'วันที่เวลาที่โพส\r\n',
  `post_status` int(11) NOT NULL COMMENT 'สถานะโพส 1 ลบ 0 ไม่ลบ'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_user`
--

CREATE TABLE `tb_user` (
  `user_id` int(11) NOT NULL COMMENT 'ไอดี',
  `user_username` varchar(100) NOT NULL COMMENT 'ชื่อผู้ใช้งาน',
  `user_password` varchar(100) NOT NULL COMMENT 'รหัสผ่าน',
  `user_fname` varchar(50) NOT NULL COMMENT 'ชื่อจริง',
  `user_lname` varchar(50) NOT NULL COMMENT 'นามสกุล',
  `user_img` text NOT NULL COMMENT 'รูปโปรไฟล์',
  `user_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'รายละเอียดเกี่ยวกับคัวเอง',
  `user_follow` int(11) NOT NULL COMMENT 'จำนวนผู้ติดตาม',
  `user_following` int(11) NOT NULL COMMENT 'จำนวนกำลังติดตาม',
  `user_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'วันที่ เข้าสู่ระบบ',
  `user_status` int(1) NOT NULL COMMENT 'สถานะuser'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_comment`
--
ALTER TABLE `tb_comment`
  ADD PRIMARY KEY (`com_id`);

--
-- Indexes for table `tb_follow`
--
ALTER TABLE `tb_follow`
  ADD PRIMARY KEY (`follow_id`);

--
-- Indexes for table `tb_likes`
--
ALTER TABLE `tb_likes`
  ADD PRIMARY KEY (`like_id`);

--
-- Indexes for table `tb_post`
--
ALTER TABLE `tb_post`
  ADD PRIMARY KEY (`post_id`);

--
-- Indexes for table `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_comment`
--
ALTER TABLE `tb_comment`
  MODIFY `com_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ไอดีcomment', AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT for table `tb_follow`
--
ALTER TABLE `tb_follow`
  MODIFY `follow_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id Follow', AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `tb_likes`
--
ALTER TABLE `tb_likes`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ไอดีคนที่ไลค์', AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `tb_post`
--
ALTER TABLE `tb_post`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ไอดีโพส', AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ไอดี', AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
