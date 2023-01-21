import { ChildProcessWithoutNullStreams } from 'child_process'
import { TransformOptions } from '@babel/core'
declare namespace iePasser {
	interface Conf {
		opts?: TransformOptions
		out?: string
		version?: '5' | '7' | '8' | '9' | '10' | '11' | 'edge'
	}
}
/**
 * IE Passer - Debug in IE easily!
 * @version 1.3.5
 * @link https://github.com/E0SelmY4V/ie-passer
 */
declare const iePasser: {
	(
		path: string | string[],
		test: { [testName: number | string]: () => void } | (() => void),
		conf?: iePasser.Conf,
	): Promise<ChildProcessWithoutNullStreams>
	default: typeof iePasser
	iePasser: typeof iePasser
	defConf: iePasser.Conf
}
export = iePasser;