const SAMPLES = {
    MISSING_LET: `10 input n
15 if n < 0 goto 45
20 let f = 1
25 if n < 2 goto 50
30 let f = f * n
35 let n = n - 1
40 goto 25
45 f = -1
50 print f
55 end `,
    MISSING_PRINT_VALUE: `10 input n
15 if n < 0 goto 45
20 let f = 1
25 if n < 2 goto 50
30 let f = f * n
35 let n = n - 1
40 goto 25
45 let f = -1
50 print 
55 end `,
    MISSING_TARGET_LINE_GOTO: `10 input n
15 if n < 0 goto
20 let f = 1
25 if n < 2 goto 50
30 let f = f * n
35 let n = n - 1
40 goto 25
45 let f = -1
50 print f
55 end `,
    MISSING_IF_CONDITION: `10 input n
15 if goto 45
20 let f = 1
25 if n < 2 goto 50
30 let f = f * n
35 let n = n - 1
40 goto 25
45 let f = -1
50 print f
55 end `
}
export default SAMPLES
