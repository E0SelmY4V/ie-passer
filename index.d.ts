import { ChildProcessWithoutNullStreams } from 'child_process'
import { TransformOptions } from '@babel/core'
export namespace iePasser {
	interface Conf {
		opts?: TransformOptions
		out?: string
		version?: '5' | '7' | '8' | '9' | '10' | '11' | 'edge'
	}
	export let defConf: Conf
}
/**
 * IE Passer - Debug in IE easily!
 * @version 1.3.4
 * @link https://github.com/E0SelmY4V/ie-passer
 */
export function iePasser(
	path: string | string[],
	test: { [testName: number | string]: () => void } | (() => void),
	conf?: iePasser.Conf,
): Promise<ChildProcessWithoutNullStreams>
export default iePasser