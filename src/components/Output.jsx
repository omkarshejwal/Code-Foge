import React, { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";

const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      setIsError(true);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const recommendVideo = () => {
    let videoLink = "";
    switch (language) {
      case "javascript":
        videoLink = "https://youtube.com/playlist?list=PLGjplNEQ1it_oTvuLRNqXfz_v_0pq6unW&si=H6_4w2uKsmf-z6yt";
        break;
      case "python":
        videoLink = "https://youtube.com/playlist?list=PLu0W_9lII9agwh1XjRt242xIpHhPT2llg&si=9vvsDlSkJE9TTMDA";
        break;
      case "typescript":
        videoLink = "https://youtube.com/playlist?list=PLwGdqUZWnOp0xfHQFmlL52b_6-QZ0mnk_&si=s2QCxgcIf4lJ22wu";
        break;
        case "csharp":
        videoLink = "https://youtu.be/SuLiu5AK9Ps?si=PiFVlYw6KFW8QaYk";
        break;
        case "java":
        videoLink = "https://youtube.com/playlist?list=PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop&si=Jkfri4B9HoPk8x1v";
        break;
      default:
        videoLink = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Default video
    }
    window.open(videoLink, "_blank");
  };

  return (
    <Box w="50%">
      <Text mb={2} fontSize="lg">
        Output
      </Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      {isError && (
        <Button variant="outline" colorScheme="red" mb={4} onClick={recommendVideo}>
          Recommend Video
        </Button>
      )}
      <Box
        height="75vh"
        p={2}
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'}
      </Box>
    </Box>
  );
};

export default Output;
